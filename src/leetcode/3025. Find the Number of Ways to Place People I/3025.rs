// https://leetcode.com/problems/find-the-number-of-ways-to-place-people-i

// Divide and Conquer, Merge Sort, Monotonic Stack
// O(n log n) time
// linear space

use std::cell::RefCell;
use std::iter::once;
use std::rc::{Rc, Weak};

struct Point {
    x: i32,
    y: i32,
    idx: RefCell<usize>,
    linked: RefCell<Option<Weak<Point>>>,
}

impl Point {
    fn new(x: i32, y: i32) -> Self {
        Self {
            x,
            y,
            idx: RefCell::new(usize::MAX),
            linked: RefCell::new(None),
        }
    }

    fn has_link(&self) -> bool {
        self.linked.borrow().is_some()
    }

    fn link(self: &Rc<Self>, other: &Rc<Point>) {
        if self.has_link() {
            return;
        }
        other.unlink_other();
        *self.linked.borrow_mut() = Some(Rc::downgrade(other));
        *other.linked.borrow_mut() = Some(Rc::downgrade(self));
    }

    fn unlink(self: &Rc<Self>) -> &Rc<Self> {
        *self.linked.borrow_mut() = None;
        self
    }

    fn unlink_other(self: &Rc<Self>) {
        self.linked.borrow_mut().as_ref().map(|linked| {
            linked.upgrade().unwrap().unlink();
        });
    }

    fn set_idx(self: &Rc<Self>, idx: usize) {
        *self.idx.borrow_mut() = idx;
    }

    fn reset(self: Rc<Self>) -> Rc<Self> {
        *self.idx.borrow_mut() = usize::MAX;
        *self.linked.borrow_mut() = None;
        self
    }
}

struct MonotonicStack<T> {
    stack: Vec<T>,
    pop_condition: Box<dyn Fn(&T, &T) -> bool>,
    on_pop: Option<Box<dyn Fn(&T, &T)>>,
}

impl<T> MonotonicStack<T> {
    fn new(pop_condition: Box<dyn Fn(&T, &T) -> bool>) -> Self {
        Self {
            stack: Vec::new(),
            pop_condition,
            on_pop: None,
        }
    }

    fn push(&mut self, val: T) {
        while let Some(top) = self.stack.last() {
            if (self.pop_condition)(&val, top) {
                let popped = self.stack.pop().unwrap();
                if let Some(ref on_pop) = self.on_pop {
                    (on_pop)(&val, &popped);
                }
            } else {
                break;
            }
        }
        self.stack.push(val);
    }

    fn len(&self) -> usize {
        self.stack.len()
    }

    fn at(&self, index: i32) -> Option<&T> {
        let index = if index < 0 {
            self.stack.len() as i32 + index
        } else {
            index
        };
        if index < 0 {
            None
        } else {
            self.stack.get(index as usize)
        }
    }
}

struct DescendingStack {
    stack: MonotonicStack<Rc<Point>>,
}

impl DescendingStack {
    fn new() -> Self {
        let mut monotonic_stack =
            MonotonicStack::new(Box::new(|new_val: &Rc<Point>, old_val: &Rc<Point>| {
                !old_val.has_link() || new_val.y > old_val.y
            }));

        monotonic_stack.on_pop = Some(Box::new(|_pushed: &Rc<Point>, popped: &Rc<Point>| {
            popped.unlink_other();
        }));

        Self {
            stack: monotonic_stack,
        }
    }

    fn push(&mut self, point: Rc<Point>) {
        self.stack.push(point);
    }

    fn at(&self, index: i32) -> Option<&Rc<Point>> {
        self.stack.at(index)
    }
}

struct AscendingStack {
    stack: MonotonicStack<Rc<Point>>,
}

impl AscendingStack {
    fn new() -> Self {
        let mut monotonic_stack =
            MonotonicStack::new(Box::new(|new_val: &Rc<Point>, old_val: &Rc<Point>| {
                new_val.y < old_val.y
            }));

        monotonic_stack.on_pop = Some(Box::new(|pushed: &Rc<Point>, popped: &Rc<Point>| {
            popped.unlink_other();
            if let Some(linked) = popped.linked.borrow().as_ref() {
                linked.upgrade().unwrap().link(pushed);
            }
        }));

        Self {
            stack: monotonic_stack,
        }
    }

    fn push(&mut self, point: Rc<Point>) {
        self.stack.push(point.clone());
        point.set_idx(self.stack.len() - 1);
    }

    fn len(&self) -> usize {
        self.stack.len()
    }
}

fn better_input(mut points: Vec<Vec<i32>>) -> Vec<Rc<Point>> {
    points.sort_unstable_by(|a, b| a[0].cmp(&b[0]).then(b[1].cmp(&a[1])));
    points
        .iter_mut()
        .enumerate()
        .for_each(|(idx, p)| p[0] = idx as i32);
    points.sort_unstable_by(|a, b| b[1].cmp(&a[1]).then(a[0].cmp(&b[0])));
    points
        .iter_mut()
        .enumerate()
        .for_each(|(idx, p)| p[1] = -(idx as i32));

    points
        .into_iter()
        .map(|p| Rc::new(Point::new(p[0], p[1])))
        .collect()
}

fn solve1(points: &mut Vec<Rc<Point>>, start: usize, end: usize) -> i32 {
    if end - start < 2 {
        return 0;
    }

    let mid = ((end - start) >> 1) + start;
    let ans = solve1(points, start, mid)
        + solve1(points, mid, end)
        + solve2(&points[start..mid], &points[mid..end]);

    // merge sort
    let mut points_clone = points[start..end].to_vec();
    points_clone.sort_by_key(|p| p.x);
    for (i, point) in points_clone.into_iter().enumerate() {
        points[start + i] = point.reset();
    }

    ans
}

fn solve2(top_points: &[Rc<Point>], bottom_points: &[Rc<Point>]) -> i32 {
    let dummy = Rc::new(Point::new(i32::MAX, 0));
    let mut top_points = top_points.into_iter().chain(once(&dummy)).peekable();

    let mut top_stack = AscendingStack::new();
    let mut bottom_stack = DescendingStack::new();

    let mut ans = 0;
    for bottom in bottom_points {
        while top_points.peek().unwrap().x < bottom.x {
            let next_top = top_points.next().unwrap();
            top_stack.push(Rc::clone(next_top));
        }
        bottom_stack.push(Rc::clone(bottom));

        let left_top_idx = bottom_stack
            .at(-2)
            .and_then(|p| p.linked.borrow().as_ref().map(|p| p.upgrade().unwrap()))
            .map(|p| *p.idx.borrow())
            .unwrap_or(0);
        ans += top_stack.len().saturating_sub(left_top_idx);

        top_points.peek().unwrap().link(bottom);
    }
    ans as i32
}

pub fn number_of_pairs(points: Vec<Vec<i32>>) -> i32 {
    let mut arr = better_input(points);
    let len = arr.len();
    solve1(&mut arr, 0, len)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn case1() {
        let points = vec![vec![1, 1], vec![2, 2], vec![3, 3]];
        let result = number_of_pairs(points);
        let ans = 0;
        assert_eq!(result, ans);
    }

    #[test]
    fn case2() {
        let points = vec![vec![6, 2], vec![4, 4], vec![2, 6]];
        let result = number_of_pairs(points);
        let ans = 2;
        assert_eq!(result, ans);
    }

    #[test]
    fn case3() {
        let points = vec![vec![3, 1], vec![1, 3], vec![1, 1]];
        let result = number_of_pairs(points);
        let ans = 2;
        assert_eq!(result, ans);
    }
}
