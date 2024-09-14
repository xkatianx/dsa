// https://leetcode.com/problems/longest-subarray-with-maximum-bitwise-and

use std::cmp::Ordering::*;
use std::i32;

pub fn longest_subarray(nums: Vec<i32>) -> i32 {
    let mut max = i32::MIN;
    let mut tmp = 0;
    let mut ans = 0;

    for num in nums {
        match num.cmp(&max) {
            Less => {
                tmp = 0;
            }
            Equal => {
                tmp += 1;
                ans = ans.max(tmp);
            }
            Greater => {
                max = num;
                tmp = 1;
                ans = 1;
            }
        }
    }
    ans
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn case1() {
        let result = longest_subarray(vec![1, 2, 3, 3, 2, 2]);
        assert_eq!(result, 2);
    }
    #[test]
    fn case2() {
        let result = longest_subarray(vec![1, 2, 3, 4]);
        assert_eq!(result, 1);
    }
}
