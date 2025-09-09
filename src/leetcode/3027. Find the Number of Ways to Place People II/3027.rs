// https://leetcode.com/problems/find-the-number-of-ways-to-place-people-ii

// Divide and Conquer, Merge Sort, Monotonic Stack
// O(n log n) time
// linear space

pub fn number_of_pairs(points: Vec<Vec<i32>>) -> i32 {
    let mut points: Vec<(i32, i32)> = points.into_iter().map(|p| (p[0], p[1])).collect();
    // Sort by y coordinate descending, then by x coordinate ascending
    points.sort_by(|a, b| b.1.cmp(&a.1).then(a.0.cmp(&b.0)));
    let len = points.len();
    solve1(&mut points, 0, len)
}

fn solve1(points: &mut Vec<(i32, i32)>, start: usize, end: usize) -> i32 {
    if end - start < 2 {
        return 0;
    }
    let mid = ((end - start) >> 1) + start;
    solve1(points, start, mid) + solve1(points, mid, end) + solve2(points, start, mid, end)
}

fn solve2(points: &mut Vec<(i32, i32)>, start: usize, mid: usize, end: usize) -> i32 {
    let mut top_y = vec![];
    let mut bottom_y = vec![];
    let mut counts = vec![0];
    let mut ans = 0;

    let mut l = start;
    for r in mid..end {
        let bottom = points[r];
        while l < mid {
            let top = points[l];
            if top.0 > bottom.0 {
                break;
            }
            while let Some(&last_y) = top_y.last() {
                if top.1 <= last_y {
                    top_y.pop();
                    let count = counts.pop().unwrap();
                    if count <= top_y.len() {
                        counts.push(count);
                    } else if count - 1 == *counts.last().unwrap() {
                        bottom_y.pop();
                    } else {
                        counts.push(count - 1);
                    }
                } else {
                    break;
                }
            }
            top_y.push(top.1);
            l += 1;
        }

        while let Some(&last_y) = bottom_y.last() {
            if bottom.1 > last_y {
                bottom_y.pop();
                counts.pop();
            } else {
                break;
            }
        }

        let count = top_y.len();
        let diff = count - counts.last().unwrap();
        ans += diff as i32;
        if diff > 0 {
            bottom_y.push(bottom.1);
            counts.push(count);
        }
    }

    // Merge the two sorted halves
    let top = points[start..mid].to_vec();
    let mut l = 0;
    let mut r = mid;
    for i in start..end {
        if l == top.len() {
            break;
        }
        if r == end || top[l].0 <= points[r].0 {
            points[i] = top[l];
            l += 1;
        } else {
            points[i] = points[r];
            r += 1;
        }
    }

    ans
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_number_of_pairs() {
        // Test case 1: [[1,1],[2,2],[3,3]] -> 0
        assert_eq!(number_of_pairs(vec![vec![1, 1], vec![2, 2], vec![3, 3]]), 0);

        // Test case 2: [[6,2],[4,4],[2,6]] -> 2
        assert_eq!(number_of_pairs(vec![vec![6, 2], vec![4, 4], vec![2, 6]]), 2);

        // Test case 3: [[3,1],[1,3],[1,1]] -> 2
        assert_eq!(number_of_pairs(vec![vec![3, 1], vec![1, 3], vec![1, 1]]), 2);
    }
}
