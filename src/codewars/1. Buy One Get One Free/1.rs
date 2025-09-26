// https://www.codewars.com/kata/67170de6312f3d3c582918ed

use core::f64;

struct SegmentTree {
    size: usize,
    tree: Vec<f64>,
}

impl SegmentTree {
    fn new(n: usize) -> Self {
        let mut size = 1;
        while size < n {
            size <<= 1;
        }
        Self {
            size,
            tree: vec![f64::INFINITY; size * 2],
        }
    }

    fn update(&mut self, pos: usize, value: f64) {
        let mut pos = pos + self.size;
        self.tree[pos] = value;
        while pos > 1 {
            pos >>= 1;
            let left = self.tree[pos * 2];
            let right = self.tree[pos * 2 + 1];
            self.tree[pos] = left.min(right);
        }
    }

    fn query_range(&self, inclusive_left: usize, exclusive_right: usize) -> f64 {
        let mut left = inclusive_left + self.size;
        let mut right = exclusive_right + self.size;
        let mut res: f64 = f64::INFINITY;

        while left < right {
            if left & 1 == 1 {
                res = res.min(self.tree[left]);
                left += 1;
            }
            if right & 1 == 1 {
                right -= 1;
                res = res.min(self.tree[right]);
            }
            left >>= 1;
            right >>= 1;
        }

        res
    }
}

struct Helper {
    tree: SegmentTree,
    n: usize,
    idx_rank: Vec<usize>,
}

impl Helper {
    fn new(arr: &[i32]) -> Self {
        let n = arr.len();

        // Create rank_idx: sorted indices by value
        let mut rank_idx: Vec<usize> = (0..n).collect();
        rank_idx.sort_unstable_by(|&a, &b| arr[a].cmp(&arr[b]));

        // Create idx_rank: for each index, what's its rank
        let mut idx_rank = vec![0; n];
        for (rank, idx) in rank_idx.into_iter().enumerate() {
            idx_rank[idx] = rank;
        }

        Self {
            tree: SegmentTree::new(n),
            n,
            idx_rank,
        }
    }

    fn add(&mut self, i: usize, s: f64) {
        self.tree.update(self.idx_rank[i], s);
    }

    fn min_geq(&self, i: usize) -> f64 {
        self.tree.query_range(self.idx_rank[i], self.n)
    }

    fn min_leq(&self, i: usize) -> f64 {
        self.tree.query_range(0, self.idx_rank[i] + 1)
    }

    fn get_min(&self) -> f64 {
        self.tree.query_range(0, self.n)
    }
}

pub fn min_earnings(mut arr: Vec<i32>) -> i64 {
    if arr.len() & 1 == 0 {
        arr.push(0);
    }
    let n = arr.len();

    // Sort pairs: ensure arr[i-1] <= arr[i] for even i
    for i in (2..n).step_by(2) {
        if arr[i - 1] > arr[i] {
            arr.swap(i - 1, i);
        }
    }

    let mut ans = 0.0;
    let mut flat = Helper::new(&arr);
    let mut slope = Helper::new(&arr);

    flat.add(0, 0.0);
    slope.add(0, arr[0] as f64);

    for i in (2..n).step_by(2) {
        let (left, right) = (arr[i - 1] as f64, arr[i] as f64);
        ans += right;

        let f = flat.min_leq(i);
        let s = slope.min_geq(i) - right;
        let v = f.min(s);
        let f2 = flat.min_leq(i - 1) + left - right;
        let s2 = slope.min_geq(i - 1) - right;
        let v2 = f2.min(s2);

        flat.add(i, v2);
        slope.add(i, v2 + right);
        flat.add(i - 1, v);
        slope.add(i - 1, v + left);
    }

    (ans + slope.get_min()) as i64
}

#[cfg(test)]
mod tests {
    use super::*;

    fn rng(seed: u32) -> impl Iterator<Item = u32> {
        let mut state = seed;
        let a: u32 = 1103515245;
        let c = 12345;
        std::iter::from_fn(move || {
            state = a.wrapping_mul(state).wrapping_add(c);
            Some(state)
        })
    }
    fn rng2(seed: u32, length: usize, min: u32, max: u32) -> Vec<u32> {
        rng(seed)
            .take(length)
            .map(|x| x % (max - min + 1) + min)
            .collect()
    }

    #[test]
    fn test_rng() {
        let arr = rng2(9999, 99999, 1, 2147483646);
        assert_eq!(
            min_earnings(arr.into_iter().map(|x| x as i32).collect()),
            59279096403998
        );
    }
}
