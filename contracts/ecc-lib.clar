(define-public (ecc-add (x1 int)
                        (y1 int)
                        (x2 int)
                        (y2 int))
(if (and (is-eq x1 x2) (is-eq y1 y2))
    (if (is-eq y1 0) 
        (ok (list 0 0))
        (let 
            ((m (/ (* 3 (* x1 x1)) (* 2 y1)))) 
            (let ((x (- (* m m) (* 2 x1)))) 
                (ok (list x (- (* m (- x1 x)) y1))))))
    (if (is-eq x1 x2) 
        (ok (list 0 0))
        (let 
            ((m (/ (- y2 y1) (- x2 x1)))) 
            (let ((x (- (- (* m m) x1) x2))) 
                (ok (list x (- (* m (- x1 x)) y1))))))
    ))

                    

