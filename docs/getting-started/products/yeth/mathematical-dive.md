# yETH: A Mathematical Deep Dive

yETH is a user-governed liquidity pool token consisting of various Ethereum Liquid Staking Derivatives (LSTs). This document provides a detailed mathematical explanation of the underlying mechanisms that govern yETH's functioning.

## Invariant Derivation

The yETH system relies on two key invariants:

1. Constant sum: The sum of all assets in the pool, denoted by $x_i$, remains constant and is represented by $c_1$. Mathematically, this is represented as $sum_i x_i = c_1$.

2. Constant weighted product: The product of all assets in the pool, each raised to their respective weight, remains constant and is represented by $c_2$. The sum of all weights is 1. This is expressed as $product_i x_i^w_i = c_2$ with $sum_i w_i = 1$.

We define $1/f := product_i w_i^(w_i)$ and $v_i := w_i n$. The balanced pool condition is expressed as $x_i = w_i D => quad c_1 = D sum_i w_i = D, quad c_2 = D product_i w_i^w_i = D/f$.

From these conditions, we derive two important equations:

- $ sum_i x_i = D quad quad quad product_i x_i^(v_i) = (D/f)^n $
- $ chi D^(n-1) sum_i x_i + product_i x_i^(v_i) = chi D^n + (D/f)^n $

These equations form the basis of the leveraged invariant and dynamic leverage in the yETH system. The weighted stableswap invariant is then derived as follows:

$ A f^n sum_i x_i + D = A D f^n + D^(n+1)/(f^n product_i x_i^v_i) $

If we set equal weights $w_i = 1/n$, this reduces to the original stableswap invariant.

## Supply Calculation

Given a pool with weights ${w_i}$ and virtual balances ${x_i}$, we can find the equilibrium supply by solving the stableswap invariant iteratively for $D$:

$ D_(m+1) = (A f^n sigma - D_m pi_m) \/ (A f^n - 1) \
pi_m = (D_m/D_(m-1))^n pi_(m-1) \
pi_0 = product_i (D_0 w_i/x_i)^(v_i) $

The iterative process is started with a good guess for $D_0$ (such as $sigma$) and continued until the desired precision is achieved.

## Balance Calculation

Given a pool with weights ${w_i}$, virtual balances ${x_i}_(i != j)$ and supply $D$, we can find the balance of a specific asset $j$ by solving the stableswap invariant for $y := x_j$.

First, we define intermediary variables $tilde(sigma) := sum_(i != j) x_i$ and $tilde(pi) := D^n w_j^(v_j) product_(i != j) (w_i/x_i)^(v_i)$.

This allows us to rewrite the invariant to
$ A f^n (tilde(sigma) + y) + D = A D f^n +  D tilde(pi)/y^(v_j) $
Rearranging gives us
$ y^(v_j + 1) + (tilde(sigma) + D/(A f^n) - D) y^(v_j) - D/(A f_n) tilde(pi) = 0 $

This is equivalent to finding the root of $g(y) = y^(a+1) + b y^a - c$, which is something that can be done iteratively using Newtons method: $y_(m+1) = y_m - g(y_m)/(g'(y_m))$.

## Swaps

In a swap, a user exchanges asset $k$ for asset $l$ ($k != l$). The balances of these assets change as follows:

$ x_k -> x_k' = x_k + Delta b_k r_k $
$ x_l -> x_l' = x_l - Delta b_l r_l $

The exact amount of asset $l$ the user will receive (or have to send) in exchange for a fixed amount of asset $k$ can be calculated by solving the balance calculation equation for $y=x_l'$ (or $y=x_k'$) and adjusting the intermediary variables accordingly.
