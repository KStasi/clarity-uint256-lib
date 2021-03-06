This project is meant to be used as a library for uint256.
Many blockchain-related services use uint256 math meanwhile Clarity only supports uint up to 128-bits long.
`uint256` is declared as tuple of 4 uint64:

```
(tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))
```

, where i0 contains the most significant bits and i3 - the less significant bits.

# Usage

There are two approaches to use the lib:

- insert private functions directly into your code that can cause a mess and elarge code (`contracts/uint256-private-lib`);
- call functions of the deployed lib (`contracts/uint256-lib`).

# Supported Methods

```
(uint256-add (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))) (b (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))
```

Computes `(a + b)` where the addition is performed on uint256 and the result is up to 256 bits long. Asserts if `a`, `b` or result is bigger than max uint256.

```
(uint256-add-short (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
(b uint))
```

Computes `(a + b)` where the addition is performed on uint256 `a` and uint128 `b` the result is up to 256 bits long. Asserts if `a` or result is bigger than max uint256.

```
(uint256-sub (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
(b (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))
```

Computes `(a - b)` where the substraction is performed on uint256 and the result is up to 256 bits long. Asserts if `a` < `b`.

```
(uint256-cmp (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
(b (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))
```

Compares `a` and `b` and returns:

- 1 if a > b
- 0 if a = b
- -1 if a < b

```
(uint256-is-eq (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
(b (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))
```

Checks if `a` and `b` is equal. Returns boolean.

```
(uint256> (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
(b (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))
```

Checks if `a` is bigger than `b`. Returns boolean.

```
(uint256< (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
(b (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))
```

Checks if `a` is smaller than `b`. Returns boolean.

```
(uint256-is-zero (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))
```

Checks if `a` is equal zero. Returns boolean.

```
(uint256-bits (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))
```

Calculates the number of bits in `a` (the most significant bit). Returns uint128.

```
(uint256-bits-64 (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))
```

Calculates the number of set batched of 64bits in `a`. It is quite useful as uint256 is represented as 4 such batches (i0, i1, i2, i3).

```
(uint256-rshift-overflow (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
(b uint))
```

Calculates bitwise right shift of `a` to an arbitary `b` bits. Doesn't panic on overflow. Returns uint256.

```
(uint256-rshift-64-overflow (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))
```

Calculates bitwise right shift of `a` to 64 bits. It is more efficient than `(uint256-rshift-overflow a u64)`. Doesn't panic on overflow. Returns uint256.

```
(uint256-lshift-1 (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))
```

Calculates bitwise left shift of `a` to 1 bit. Returns uint256.

```
(uint256-check-bit (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))) (b uint))
```

Returns the `a`'s bit with index `b`.

```
(uint512-to-uint256-overflow (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint) (i4 uint) (i5 uint) (i6 uint) (i7 uint))))
```

Converts uint512 to uint256. Doesn't panic if `a` is bigger than max uint256.

```
(uint-to-uint256 (a uint))
```

Converts uint to uint256.

```
(uint256-mul (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
(b (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))
```

Computes `(a * b)` where the multiplication is performed on uint256 and the result is up to 512 bits long.

```
(uint256-mul-short (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
(b uint))
```

Computes `(a * b)` where `a` is uint256 and `b` is uint128 and the result is up to 256 bits long. Asserts if the result is bigger than max uint256.

```
(uint256-mul-mod (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
(b (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
(m uint))
```

Computes `(a * b) % m` where the multiplication is performed on uint256 and the result is divided by modulo `m` and is up to 256 bits long.

```
(uint256-div (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
(b (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))
```

Computes `(a % b)` where the division is performed on uint256 and the result is up to 256 bits long. Asserts b is not equal to zero.

```
(uint256-mod (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
(b (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))
```

Computes `(a % b)` where the division by modulo is performed on uint256 and the result is up to 256 bits long.

```
(uint256-mul-mod-short (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
(b uint)
(m (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))
```

Computes the same as `uint256-mul-mod` but b is uint128.

# Examples

`uint256-ecc-lib.clar` shows how to use lib by importing private methods. The contract implements eliptic addition and multiplication for bn128_alt elliptic curve according to this [implementation](https://github.com/ethereum/py_pairing/blob/master/py_ecc/bn128/bn128_curve.py). Note: the results produced by this implementation doesn't match to the results received using Ethereum [precompiled contracts](https://docs.klaytn.com/smart-contract/precompiled-contracts). So it is used only as possible usecase.

# Miscellaneous

Working with **Clarity** I felt need in some syntactic sugar and standarts that would make code more readable:

- Type declaration in order to clearly see the same types. For instance:

```

(type point (tuple (i0 u0) (i1 u0) (i2 u0) (i3 u0)))

```

- Imports to avoid copying common code. For instance:

```

(load "/path/to/file")

```

- Clarify logs. Now it displays only part of call stack(the top-level function only).

- Fix or documement recursive calls error, generated by composition of the same function. To reproduce error, replace `ecc-add` in `contracts/uint256-ecc-lib` by this one:

```
(define-public (ecc-add (p1 (tuple (x (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))) (y (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))))
                        (p2 (tuple (x (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))) (y (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))))
(if (is-zero-point p1)
    (ok p2)
    (if (is-zero-point p2)
        (ok p1)
        (if (and (uint256-is-eq (get x p1) (get x p2)) (uint256-is-eq (get y p1) (get y p2)))
            (if (uint256-is-zero (get y p1))
                (ok (tuple (x uint256-zero) (y uint256-zero)))
                (let
                    ((m (uint256-div
                        (uint256-mul-mod-short (uint256-mul-mod (get x p1) (get x p1) zk-p) u3 zk-p)
                        (uint256-mul-mod-short (get y p1) u2 zk-p))))
                    (let ((m1 (uint256-mul-mod m m zk-p)) (m2 (uint256-mul-mod-short (get x p1) u2 zk-p)))
                        (let ((x (uint256-sub
                            m1
                            m2)))
                            (ok (tuple (x x) (y (uint256-sub (uint256-mul-mod m (uint256-sub (get x p1) x) zk-p) (get y p1))))))))) ;;  << CHANGES HERE
            (if (uint256-is-eq (get x p1) (get x p2))
                (ok (tuple (x uint256-zero) (y uint256-zero)))
                (let ((mt (uint256-sub (get x p2) (get x p1))))
                    (let ((m (uint256-div (uint256-sub (get y p2) (get y p1)) mt)))
                        (let ((xt (uint256-sub (uint256-mul-mod m m zk-p) (get x p1))))
                            (let ((x (uint256-sub xt (get x p2))))
                                (let ((yt (uint256-mul-mod m (uint256-sub (get x p1) x) zk-p)))
                                    (ok (tuple (x x) (y (uint256-sub yt (get y p1)))))))))))
            ))))
```

- Code style standart. It's not clear how to indent and wrap code to make readable for others. For instance, Golang has such a utill as `fmt` that solves the issue by formating code and teach everybody write standartized code.

- Better docs and tutorials.

- Developer-friendly deployment from [UI](https://testnet-explorer.blockstack.org/sandbox). There is no way to load or save the contract code on sandbox(edditing the samples is the only option).

- Expand deployment fail reasons. The message is not really helpful:

```
This transaction did not succeed because the transaction was aborted during its execution.
```
