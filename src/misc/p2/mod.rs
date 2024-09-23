pub fn fair_jewelry_distribution(values: Vec<u32>) -> Vec<i32> {
    if values.len() < 2 {
        panic!();
    }

    // 3^24 > 1 + 2 * 24 * 2^32
    let arr: Vec<i64> = values.iter().take(24).map(|&x| x as i64).collect();
    let mid = arr.len() / 2;
    let bits = solve(arr).unwrap_or_else(|err| err);

    let output = vec![0; values.len()];
    bits_to_output(output, mid, bits)
}

fn solve(arr: Vec<i64>) -> Result<(i32, i32), (i32, i32)> {
    let mid = arr.len() / 2;
    let (left_arr, right_arr) = arr.split_at(mid);

    let mut left_sum = gen_sum(left_arr)?.into_iter().peekable();
    let mut right_sum = gen_sum(right_arr)?.into_iter().peekable();

    let mut min_diff = i64::MAX;
    let mut ans_bits = (0, 0);

    while let (Some(&left), Some(&right)) = (left_sum.peek(), right_sum.peek()) {
        if left > right {
            left_sum.next();
        } else {
            right_sum.next();
        }
        if valid_bits(left.1, right.1) {
            let diff = (left.0 - right.0).abs();
            if diff < min_diff {
                min_diff = diff;
                ans_bits = (left.1, right.1)
            }
        }
    }

    Ok(ans_bits)
}

fn bits_to_output(mut arr: Vec<i32>, mid: usize, mut bits: (i32, i32)) -> Vec<i32> {
    for i in 0..32 {
        if bits.0 & 1 > 0 {
            arr[i] = 1;
        }
        if bits.0 & 2 > 0 {
            arr[i] = -1;
        }
        if bits.1 & 1 > 0 {
            arr[mid + i] = -1;
        }
        if bits.1 & 2 > 0 {
            arr[mid + i] = 1;
        }
        bits.0 >>= 2;
        bits.1 >>= 2;
    }

    arr
}

/* true if we do select two non-empty disjoint subsets */
fn valid_bits(a: i32, b: i32) -> bool {
    a - 1 & a != 0 || b - 1 & b != 0 || a * b != 0
}

fn gen_sum(arr: &[i64]) -> Result<Vec<(i64, i32)>, (i32, i32)> {
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
        Err((output[mid - 1].1, 0))
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

    fn inner_product(vec1: Vec<u32>, vec2: Vec<i32>) -> i32 {
        vec1.iter()
            .zip(vec2.iter())
            .map(|(&x, &y)| (x as i64) * (y as i64))
            .sum::<i64>() as i32
    }

    fn test(values: Vec<u32>, expect_diff: i32) {
        println!("input: {:?}", &values);
        let output = fair_jewelry_distribution(values.clone());
        println!("output: {:?}", &output);
        assert!(output.contains(&1), "Bob has nothing.");
        assert!(output.contains(&-1), "Carol has nothing.");
        let diff = inner_product(values, output).abs();
        assert_eq!(expect_diff, diff, "The distribution is not fair.");
    }

    #[test]
    fn case1() {
        let values = vec![39, 44, 9, 57];
        let expect_diff = 4;
        test(values, expect_diff);
    }

    #[test]
    fn case2() {
        let values = vec![1, 2, 3, 42, 4242, 424242];
        let expect_diff = 0;
        test(values, expect_diff);
    }

    #[test]
    fn case3() {
        let values = vec![97, 12, 19, 90];
        let expect_diff = 0;
        test(values, expect_diff);
    }

    #[test]
    fn case_random() {
        let mut rng = rand::thread_rng();

        for n in 2..30 {
            let values: Vec<u32> = (0..n).map(|_| rng.gen_range(1..=u32::MAX)).collect();
            println!("input: {:?}", &values);
            let output = fair_jewelry_distribution(values.clone());
            println!("output: {:?}", &output);
            let diff = inner_product(values, output).abs();
            println!("output diff: {}", diff);
        }
    }
}
