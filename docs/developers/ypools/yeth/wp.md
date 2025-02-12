# yETH Weighted Stableswap

## Author

0xkorin - Yearn Finance (0xkorin@proton.me)

---

## Invariant Derivation

### Constant Sum

$$
\sum_i x_i = c_1
$$

### Constant Weighted Product

$$
\prod_i x_i^{w_i} = c_2 \quad \text{with} \quad \sum_i w_i = 1
$$

Define:
$$
\frac{1}{f} \coloneqq \prod_i w_i^{w_i}, \quad v_i \coloneqq w_i^n
$$

### Balanced Pool

$$
x_i = w_i D \implies c_1 = D \sum_i w_i = D, \quad c_2 = D \prod_i w_i^{w_i} = \frac{D}{f}
$$

$$
x_i = \frac{D}{f^{v_i}}
$$

---

## Leveraged Invariant

$$
\chi D^{n-1} \sum_i x_i + \prod_i x_i^{v_i} = \chi D^n + \frac{D^n}{f^n}
$$

---

## Dynamic Leverage

$$
\chi = A \prod_i x_i^{v_i} \frac{D^n}{f^n}
$$

---

## Weighted Stableswap Invariant

$$
A f^n \sum_i x_i + D = A D f^n + \frac{D^{n+1}}{f^n \prod_i x_i^{v_i}}
$$

This reduces to the original stableswap invariant if we set equal weights $w_i = \frac{1}{n}$.

Define:
$$
\sigma \coloneqq \sum_i x_i, \quad \pi \coloneqq \frac{D^n}{\prod_i w_i x_i^{v_i}}
$$

$$
A f^n \sigma + D = A D f^n + D \pi \tag{1}
$$

---

## Supply Calculation

Given a pool with weights $\{w_i\}$ and virtual balances $\{x_i\}$, the equilibrium supply $D$ can be found by solving Equation (1) iteratively:

$$
D_{m+1} = \frac{A f^n \sigma - D_m \pi_m}{A f^n - 1}
$$

Where:
$$
\pi_m = \frac{D_m^n}{D_{m-1}^n} \pi_{m-1}
$$

Starting with:
$$
\pi_0 = \prod_i \frac{D_0 w_i x_i^{v_i}}{D_0}
$$

The iterative process begins with a good initial guess for $D_0$ (e.g., $\sigma$) and continues until the desired precision is achieved.

---

## Rate Update

$$
x_i = b_i r_i \rightarrow x_i' = b_i r_i'
$$

$$
\sigma \rightarrow \sigma' = \sigma + b_i (r_i' - r_i)
$$

$$
D \rightarrow D', \quad \pi \rightarrow \pi' = \frac{D'^n}{D^n} \frac{r_i}{r_i'} v_i \pi
$$

Equation (2) is used iteratively to find both $D'$ and $\pi'$, starting with $D'_0 = D$ and $\pi'_0 = \pi \frac{r_i}{r_i'} v_i$.

---

## Balance Calculation

Given weights $\{w_i\}$, virtual balances $\{x_i\}_{i \neq j}$, and supply $D$, the balance of a specific asset $j$ can be found by solving Equation (1) for $y \coloneqq x_j$.

Define intermediary variables:
$$
\tilde{\sigma} \coloneqq \sum_{i \neq j} x_i, \quad \tilde{\pi} \coloneqq \frac{D^n w_j^{v_j}}{\prod_{i \neq j} w_i x_i^{v_i}}
$$

Rewriting Equation (1):
$$
A f^n (\tilde{\sigma} + y) + D = A D f^n + D \tilde{\pi} y^{v_j}
$$

Rearranging:
$$
y^{v_j+1} + \tilde{\sigma} y^{v_j} - \frac{D}{A f^n} y - \frac{D}{A f^n} \tilde{\pi} = 0
$$

This root can be found using Newton's method.

---

## Swaps

### Exact Input

Find $\Delta b_l$ given $\Delta b_k$:
$$
\tilde{\sigma} = \sigma + \Delta b_k r_k - x_l, \quad \tilde{\pi} = \frac{x_k}{x_k'} v_k \frac{x_l^{v_l}}{\pi}
$$

$$
\Delta b_l = \frac{x_l - x_l'}{r_l}
$$

---

### Exact Output

Find $\Delta b_k$ given $\Delta b_l$:
$$
\tilde{\sigma} = \sigma - x_k - \Delta b_l r_l, \quad \tilde{\pi} = \frac{x_k^{v_k}}{x_l x_l'} v_l \pi
$$

$$
\Delta b_k = \frac{x_k' - x_k}{r_k}
$$
