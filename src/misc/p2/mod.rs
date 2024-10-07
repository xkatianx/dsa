pub fn fair_jewelry_distribution(values: Vec<i32>) -> String {
    // 2^22 > 22 * 123456
    format!(
        "{:A<width$}",
        solve(&values[..values.len().min(22)]),
        width = values.len()
    )
}

fn solve(arr: &[i32]) -> String {
    let mut min_diff = i32::MAX;
    let mut ans_bits = (0, 0);

    let mid = arr.len() / 2;
    let (left_arr, right_arr) = arr.split_at(mid);
    let mut left_sum = gen_sum(left_arr).into_iter();
    let mut right_sum = gen_sum(right_arr).into_iter();
    let mut left = left_sum.next();
    let mut right = right_sum.next();

    while let (Some(l), Some(r)) = (left, right) {
        if valid_bits(l.1, r.1) {
            let diff = (l.0 - r.0).abs();
            if diff < min_diff {
                min_diff = diff;
                ans_bits = (l.1, r.1)
            }
        }
        if left > right {
            left = left_sum.next();
        } else {
            right = right_sum.next();
        }
    }

    bits_to_output(arr.len(), ans_bits)
}

fn bits_to_output(l: usize, bits: (i32, i32)) -> String {
    let mid = l / 2;
    let (mut a, mut b) = bits;
    let mut out = String::new();

    for _ in 0..mid {
        out.push("ABC".chars().nth((a & 3) as usize).unwrap());
        a >>= 2;
    }

    for _ in 0..(l - mid) {
        out.push("ACB".chars().nth((b & 3) as usize).unwrap());
        b >>= 2;
    }

    out
}

/* true if we do select two non-empty disjoint subsets */
fn valid_bits(a: i32, b: i32) -> bool {
    a - 1 & a != 0 || b - 1 & b != 0 || a * b != 0
}

fn gen_sum(arr: &[i32]) -> Vec<(i32, i32)> {
    let mut output = vec![(0_i32, 0)];
    let mut mask = 1;

    for num in arr {
        let mut plus: Vec<_> = output
            .iter()
            .map(|(sum, bits)| (*sum + num, *bits | mask))
            .collect();
        mask <<= 1;

        let minus: Vec<_> = output
            .iter()
            .map(|(sum, bits)| (*sum - num, *bits | mask))
            .collect();
        mask <<= 1;

        plus.extend(output.into_iter());
        plus.extend(minus.into_iter());
        plus.sort();
        output = plus;
    }
    output.reverse();
    output.truncate(output.len() / 2 + 1);
    output
}

#[cfg(test)]
mod tests {
    use super::*;
    use rand::Rng;

    fn string_to_vec(input: String) -> Vec<i32> {
        input
            .chars()
            .map(|c| match c {
                'A' => 0,
                'B' => 1,
                'C' => -1,
                _ => panic!(),
            })
            .collect()
    }

    fn inner_product(vec1: Vec<i32>, vec2: Vec<i32>) -> i32 {
        vec1.iter()
            .zip(vec2.iter())
            .map(|(&x, &y)| (x as i64) * (y as i64))
            .sum::<i64>() as i32
    }

    fn test(values: Vec<i32>, expect_diff: i32) {
        println!("input: {:?}", &values);
        let output = fair_jewelry_distribution(values.clone());
        println!("output: {:?}", &output);
        let vector = string_to_vec(output);
        assert!(vector.contains(&1), "Bob has nothing.");
        assert!(vector.contains(&-1), "Carol has nothing.");
        let diff = inner_product(values, vector).abs();
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
    fn case_random() {
        let mut rng = rand::thread_rng();

        for n in 13..24 {
            let values: Vec<i32> = (0..n).map(|_| rng.gen_range(1..123456)).collect();
            println!("input: {:?}", &values);
            let output = fair_jewelry_distribution(values.clone());
            println!("output: {:?}", &output);
            let vector = string_to_vec(output);
            let diff = inner_product(values, vector).abs();
            println!("output diff: {}", diff);
        }
    }
}
