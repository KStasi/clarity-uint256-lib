(define-constant iter-buff (keccak256 0))
(define-constant uint64-max u18446744073709551615)
(define-constant uint256-zero (tuple (i0 u0) (i1 u0) (i2 u0) (i3 u0)))
(define-data-var btmp bool false)
(define-data-var utmp uint u0)
(define-data-var uint256-tmp0 (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)) uint256-zero)
(define-data-var uint256-tmp1 (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)) uint256-zero)


(define-public (uint256-add (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
                            (b (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))) 

(let ((i3 (+ (get i3 a) (get i3 b))))
    (let ((i2 (+ (+ (get i2 a) (get i2 b))
        (if (> i3 uint64-max) u1 u0))))
    (let ((i1 (+ (+ (get i1 a) (get i1 b)) 
        (if (> i2 uint64-max) u1 u0))))
    (let ((i0 (+ (+ (get i0 a) (get i0 b))
        (if (> i1 uint64-max) u1 u0))))
    (ok (tuple (i0 (mod i0 uint64-max)) 
        (i1 (mod i1 uint64-max)) 
        (i2 (mod i2 uint64-max)) 
        (i3 (mod i3 uint64-max)))))))))


