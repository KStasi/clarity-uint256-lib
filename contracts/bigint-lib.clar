(define-constant iter-buff (keccak256 0))
(define-constant uint64-max u18446744073709551615)
(define-constant uint64-max-limit u18446744073709551616)
(define-constant uint256-zero (tuple (i0 u0) (i1 u0) (i2 u0) (i3 u0)))
(define-data-var btmp bool false)
(define-data-var utmp uint u0)
(define-data-var uint256-tmp0 (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)) uint256-zero)
(define-data-var uint256-tmp1 (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)) uint256-zero)


(define-public (uint256-add (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
                            (b (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))) 

(let ((i3 (+ (get i3 a) (get i3 b))))
    (let ((i2 (+ (+ (get i2 a) (get i2 b))
        (if (> i3 uint64-max) (/ i3 uint64-max-limit) u0))))
    (let ((i1 (+ (+ (get i1 a) (get i1 b)) 
        (if (> i2 uint64-max) (/ i2 uint64-max-limit) u0))))
    (let ((i0 (+ (+ (get i0 a) (get i0 b))
        (if (> i1 uint64-max) (/ i1 uint64-max-limit) u0))))
    (ok (tuple (i0 i0) 
        (i1 ( if (> (/ i1 uint64-max-limit) u0) uint64-max i1)) 
        (i2 ( if (> (/ i2 uint64-max-limit) u0) uint64-max i2)) 
        (i3 ( if (> (/ i3 uint64-max-limit) u0) uint64-max i3)))))))))

(define-public (uint256-sub (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
                            (b (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))) 

(let ((i3 (- (to-int (get i3 a)) (to-int (get i3 b)))))
    (let ((i2 (- (- (to-int (get i2 a)) (to-int (get i2 b)))
        (if (< i3 0)  (/ i3 (to-int uint64-max)) 0))))
    (let ((i1 (- (- (to-int (get i1 a)) (to-int (get i1 b))) 
        (if (< i2 0) (/ i2 (to-int uint64-max)) 0))))
    (let ((i0 (- (- (to-int (get i0 a)) (to-int (get i0 b)))
        (if (< i1 0) (/ i1 (to-int uint64-max)) 0))))
    (ok (tuple (i0  (to-uint i0)) 
        (i1 (mod (to-uint (if (< i1 0) (- i1 0) i1)) uint64-max-limit)) 
        (i2 (mod (to-uint (if (< i1 0) (- i2 0) i2)) uint64-max-limit)) 
        (i3 (mod (to-uint (if (< i1 0) (- i3 0) i3)) uint64-max-limit)))))))))


