// https://leetcode.com/problems/find-the-longest-substring-containing-vowels-in-even-counts

// parity
// 🚀 linear time
// 🤏 constant space
pub fn find_the_longest_substring(s: String) -> i32 {
    let mut first = [-2; 32];
    first[0] = -1;
    let mut ans = 0;
    let mut count = 0;
    for (i, c) in s.chars().enumerate() {
        match c {
            'a' => count ^= 1,
            'e' => count ^= 2,
            'i' => count ^= 4,
            'o' => count ^= 8,
            'u' => count ^= 16,
            _ => {}
        }
        let j = first[count];
        if j == -2 {
            first[count] = i as i32;
        } else {
            ans = ans.max(i as i32 - j);
        }
    }
    ans
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn case1() {
        let result = find_the_longest_substring("eleetminicoworoep".to_owned());
        assert_eq!(result, 13);
    }
    #[test]
    fn case2() {
        let result = find_the_longest_substring("leetcodeisgreat".to_owned());
        assert_eq!(result, 5);
    }
    #[test]
    fn case3() {
        let result = find_the_longest_substring("bcbcbc".to_owned());
        assert_eq!(result, 6);
    }
}
