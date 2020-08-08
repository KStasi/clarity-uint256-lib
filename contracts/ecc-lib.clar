(define-public (ecc-add (x1 int)
                        (y1 int)
                        (x2 int)
                        (y2 int))
    (let 
        ((m (/ (- y2 y1) (- x2 x1)))) 
        (let ((x (- (- (* m m) x1) x2))) 
            (ok (list x (- (* m (- x1 x)) y1))))))
                    

