This project is meant to be used as a library for uint256.
Many blockchain-related services use uint256 math meanwhile Clarity only supports uint up to 128-bits long.

# Usage

There are two approaches to use the lib:

- insert private functions directly into your code that can cause a mess and elarge code (`contracts/uint256-private-lib`);
- call functions of the deployed lib (`contracts/uint256-lib`).

# Supported Methods

(uint256-add (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
(b (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))

(uint256-cmp (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
(b (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))

(uint256-add-short (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
(b uint))
(uint256-is-eq (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
(b (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))

(uint256> (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
(b (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))

(uint256< (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
(b (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))

(uint256-is-zero (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))

(uint256-bits (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))

(uint256-bits-64 (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))

(uint256-rshift-64-unsafe (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))

(uint256-rshift-unsafe (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
(b uint))

(uint256-lshift-1-unsafe (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))

(uint256-check-bit (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))) (b uint))

(uint256-sub (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
(b (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))

(uint256-mul-short (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
(b uint))

(uint256-mul (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
(b (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))

(uint256-div (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
(b (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))

(uint256-mod (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
(b (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))

(uint512-to-uint256-unsafe (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint) (i4 uint) (i5 uint) (i6 uint) (i7 uint))))

(uint-to-uint256 (a uint))

(uint256-mul-mod (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
(b (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))) (m uint))

(uint256-mul-mod-short (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
(b uint)
(m (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))

# Examples

`uint256-ecc-lib.clar` shows how to use lib by importing private methods. The contract implements eliptic addition and multiplication for bn128_alt elliptic curve according to this [implementation](https://github.com/ethereum/py_pairing/blob/master/py_ecc/bn128/bn128_curve.py). Note: the results produced by this implementation doesn't match to the results received using Ethereum [precompiled contracts](https://docs.klaytn.com/smart-contract/precompiled-contracts). So it is used only as possible usecase.

# Miscellaneous

Working with **Clarity** I felt need in some syntactic sugar that would make code more readable:

- Type declaration in order to clearly see the same types. For instance:

```
(type point (tuple (i0 u0) (i1 u0) (i2 u0) (i3 u0)))
```

- Imports to avoid copying common code. For instance:

```
(load "/path/to/file")
```

- Code style standart. It's not clear how to indent and wrap code to make readable for others. For instance, Golang has such a utill as `fmt` that solves the issue by formating code and teach everybody write standartized code.
