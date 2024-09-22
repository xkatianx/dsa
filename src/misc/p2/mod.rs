pub fn minimum_difference_of_subsets(arr: Vec<i32>) -> i32 {
    match arr.len() {
        0..=1 => panic!(),
        2..=22 => solve(arr.iter().map(|&x| x as i64).collect()).unwrap_or(0),
        // 3^23 > 1 + 2 * 23 * 2^32
        _ => 0,
    }
}

fn solve(arr: Vec<i64>) -> Result<i32, ()> {
    let mid = arr.len() / 2;
    let (left_arr, right_arr) = arr.split_at(mid);

    let mut left_sum = gen_sum(left_arr)?.into_iter().peekable();
    let mut right_sum = gen_sum(right_arr)?.into_iter().peekable();

    let mut ans = i64::MAX;
    let mut ans_bits = (0, 0);

    while let (Some(&left), Some(&right)) = (left_sum.peek(), right_sum.peek()) {
        if left > right {
            left_sum.next();
        } else {
            right_sum.next();
        }
        if valid_bits(left.1, right.1) {
            let diff = (left.0 - right.0).abs();
            if diff < ans {
                ans = diff;
                ans_bits = (left.1, right.1)
            }
        }
    }

    print_sets(ans_bits, left_arr, right_arr);
    Ok(ans as i32)
}

fn print_sets(mut ans_pair: (i32, i32), left_arr: &[i64], right_arr: &[i64]) {
    let mut left_set = vec![];
    let mut right_set = vec![];
    for i in 0..32 {
        if ans_pair.0 & 1 > 0 {
            left_set.push(left_arr[i]);
        }
        if ans_pair.0 & 2 > 0 {
            right_set.push(left_arr[i]);
        }
        if ans_pair.1 & 1 > 0 {
            right_set.push(right_arr[i]);
        }
        if ans_pair.1 & 2 > 0 {
            left_set.push(right_arr[i]);
        }
        ans_pair.0 >>= 2;
        ans_pair.1 >>= 2;
    }
    println!("set 1: {:?}\nset 2: {:?}", left_set, right_set);
}

/* true if we do select two non-empty disjoint subsets */
fn valid_bits(a: i32, b: i32) -> bool {
    a - 1 & a != 0 || b - 1 & b != 0 || a * b != 0
}

fn gen_sum(arr: &[i64]) -> Result<Vec<(i64, i32)>, ()> {
    let mut output = vec![(0_i64, 0)];

    let mut mask_this = 1;
    let mut mask_that = 2;

    for num in arr {
        let plus = output
            .iter()
            .map(|(sum, bits)| (*sum + num, *bits | mask_this));
        let zero = output.clone().into_iter();
        let minus = output
            .iter()
            .map(|(sum, bits)| (*sum - num, *bits | mask_that));

        output = merge_sort(minus, zero, plus);

        mask_this <<= 2;
        mask_that <<= 2;
    }

    let mid = output.len() / 2 + 1;
    if output[mid].0 == 0 {
        Err(())
    } else {
        output.truncate(mid);
        Ok(output)
    }
}

/* input -, 0, +
 * output big to small
 * impl specific to this problem. */
fn merge_sort<I1, I2, I3>(iter1: I1, iter2: I2, iter3: I3) -> Vec<(i64, i32)>
where
    I1: Iterator<Item = (i64, i32)>,
    I2: Iterator<Item = (i64, i32)>,
    I3: Iterator<Item = (i64, i32)>,
{
    let mut result = Vec::new();
    let mut iter1 = iter1.peekable();
    let mut iter2 = iter2.peekable();
    let mut iter3 = iter3.peekable();

    loop {
        let val3 = iter3.peek().unwrap_or(&(i64::MIN, 0));
        let res2 = iter2.peek();
        if res2.is_none() {
            break;
        }
        let val2 = res2.unwrap();
        let val1 = iter1.peek().unwrap();

        if val1 >= val2 && val1 >= val3 {
            result.push(*val1);
            iter1.next();
        } else if val2 >= val3 {
            result.push(*val2);
            iter2.next();
        } else {
            result.push(*val3);
            iter3.next();
        }
    }

    result.extend(iter1);

    result
}

#[cfg(test)]
mod tests {
    use super::*;
    use rand::Rng;

    #[test]
    fn case1() {
        let arr = vec![39, 44, 9, 57];
        let result = minimum_difference_of_subsets(arr);
        assert_eq!(result, 4);
    }

    #[test]
    fn case2() {
        let arr = vec![66, 31, 35];
        let result = minimum_difference_of_subsets(arr);
        assert_eq!(result, 0);
    }

    #[test]
    fn case3() {
        let arr = vec![97, 12, 19, 90];
        let result = minimum_difference_of_subsets(arr);
        assert_eq!(result, 0);
    }

    #[test]
    fn case4() {
        let arr = vec![1, 42, 1, 4242];
        let result = minimum_difference_of_subsets(arr);
        assert_eq!(result, 0);
    }

    #[test]
    fn case5() {
        let arr = vec![1, 2, 3, 42, 4242, 424242];
        let result = minimum_difference_of_subsets(arr);
        assert_eq!(result, 0);
    }

    #[test]
    fn case_random() {
        let mut rng = rand::thread_rng();

        for n in 2..40 {
            let arr: Vec<i32> = (0..n).map(|_| rng.gen_range(1..=i32::MAX)).collect();
            println!("arr: {:?}", &arr);
            let result = minimum_difference_of_subsets(arr);
            println!("ans: {:?}\n", result);
        }
    }
}
