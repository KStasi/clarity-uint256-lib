;; for Y^2 = X^3 + 3
(define-constant zk-p (tuple (i0 u348699826680297066) (i1 u10551491231982245282) (i2 u17693782080786384756) (i3 u9656633723982741434)))
(define-constant zk-q (tuple (i0 u348699826680297066) (i1 u10551491231982245282) (i2 u16891761104669281089) (i3 u13401866920200346009)))
(define-constant iter-buff-32 (keccak256 0))
(define-constant iter-buff-64 0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000)
(define-constant uint256-zero (tuple (i0 u0) (i1 u0) (i2 u0) (i3 u0)))

(define-private (is-zero-point (p (tuple (x (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))) (y (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))))) 
    (and (unwrap-panic (contract-call? 'S1G2081040G2081040G2081040G208105NK8PE5.uint256-lib uint256-is-zero (get x p)))
    (unwrap-panic (contract-call? 'S1G2081040G2081040G2081040G208105NK8PE5.uint256-lib uint256-is-zero (get y p)))))

(define-private (uint256-is-eq (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
                            (b (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))
    (unwrap-panic (contract-call? 'S1G2081040G2081040G2081040G208105NK8PE5.uint256-lib uint256-is-eq a b)))

(define-private (uint256-is-zero (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))
    (unwrap-panic (contract-call? 'S1G2081040G2081040G2081040G208105NK8PE5.uint256-lib uint256-is-zero a)))

(define-private (uint256-div (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
                            (b (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))) 
    (unwrap-panic (contract-call? 'S1G2081040G2081040G2081040G208105NK8PE5.uint256-lib uint256-div a b)))

(define-private (uint256-mul-mod-short (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
                            (b uint) 
                            (m (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))
    (unwrap-panic (contract-call? 'S1G2081040G2081040G2081040G208105NK8PE5.uint256-lib uint256-mul-mod-short a b m)))

(define-private (uint256-mul-mod (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
                            (b (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))) 
                            (m (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))))
    (unwrap-panic (contract-call? 'S1G2081040G2081040G2081040G208105NK8PE5.uint256-lib uint256-mul-mod a b m)))

(define-private (uint256-sub (a (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))
                            (b (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))) 
    (unwrap-panic (contract-call? 'S1G2081040G2081040G2081040G208105NK8PE5.uint256-lib uint256-sub a b)))
                   
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
                            (let ((yt (uint256-mul-mod m (uint256-sub (get x p1) x) zk-p))) 
                                (ok (tuple (x x) (y (uint256-sub yt (get y p1))))))))))
            (if (uint256-is-eq (get x p1) (get x p2)) 
                (ok (tuple (x uint256-zero) (y uint256-zero)))
                (let ((mt (uint256-sub (get x p2) (get x p1))))
                    (let ((m (uint256-div (uint256-sub (get y p2) (get y p1)) mt)))
                        (let ((xt (uint256-sub (uint256-mul-mod m m zk-p) (get x p1))))
                            (let ((x (uint256-sub xt (get x p2))))
                                (let ((yt (uint256-mul-mod m (uint256-sub (get x p1) x) zk-p)))
                                    (ok (tuple (x x) (y (uint256-sub yt (get y p1)))))))))))
            ))))

(define-private (mul-bit (b (buff 1))
                        (data (tuple (s uint) 
                                (p (tuple (x (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))) (y (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))))
                                (r (tuple (x (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))) (y (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))))))
) 
(tuple 
    (r (if (is-eq (mod (get s data) u2) u1)
        (unwrap-panic (ecc-add 
            (get r data) 
            (get p data)))
            (get r data)))
    (p (unwrap-panic (ecc-add 
            (get p data) 
            (get p data))))
    (s (/ (get s data) u2))))

(define-public (ecc-mul (p (tuple (x (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint))) (y (tuple (i0 uint) (i1 uint) (i2 uint) (i3 uint)))))
                        (scalar uint))
    (ok (get r (fold mul-bit 
        iter-buff-32 (tuple (s scalar) (p p) (r (tuple (x uint256-zero) (y uint256-zero))))))))
