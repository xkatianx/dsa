//
pub fn f() -> i32 {
    0
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn case1() {
        let result = f();
        let ans = 0;
        assert_eq!(result, ans);
    }
    #[test]
    fn case2() {
        let result = f();
        let ans = 0;
        assert_eq!(result, ans);
    }
}
