// https://leetcode.com/problems/minimum-time-difference

pub fn find_min_difference(time_points: Vec<String>) -> i32 {
    if time_points.len() > 1440 {
        return 0;
    }
    let mut time = time_points
        .iter()
        .map(|s| {
            let h: i32 = s[0..2].parse().unwrap();
            let m: i32 = s[3..5].parse().unwrap();
            h * 60 + m
        })
        .collect::<Vec<_>>();
    time.sort_unstable();
    time.windows(2).fold(
        24 * 60 + time.first().unwrap() - time.last().unwrap(),
        |ans, window| ans.min(window[1] - window[0]),
    )
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn case1() {
        let input = vec!["23:59", "00:00"]
            .into_iter()
            .map(|s| s.to_owned())
            .collect();
        let result = find_min_difference(input);
        let ans = 1;
        assert_eq!(result, ans);
    }
    #[test]
    fn case2() {
        let input = vec!["00:00", "23:59", "00:00"]
            .into_iter()
            .map(|s| s.to_owned())
            .collect();
        let result = find_min_difference(input);
        let ans = 0;
        assert_eq!(result, ans);
    }
}
