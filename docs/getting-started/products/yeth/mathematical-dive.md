# Weighted Stableswap: Math Deep Dive

## Invariant Derivation

1. Constant sum: The sum of all virtual balances equals a constant, $c_1$.

- $sum_{i} x_i = c_1$

2. Constant weighted product: The product of each virtual balance raised to its corresponding weight equals a constant, $c_2$. The sum of all weights equals 1.

- $product_{i} x_i^{w_i} = c_2$
- $sum_{i} w_i = 1$

We define 

- $1/f := product_{i} w_i^{(w_i)}$
- $v_i := w_i n$

In a balanced pool, 

- $x_i = w_i D$

This implies that 

- $c_1 = D sum_{i} w_i = D$ 
- $c_2 = D product_{i} w_i^{w_i} = D/f$

From these definitions, we can derive the following expressions:

- $sum_{i} x_i = D$
- $product_{i} x_i^{(v_i)} = (D/f)^n$

The leveraged invariant can be defined as:

- $chi D^{(n-1)} sum_{i} x_i + product_{i} x_i^{(v_i)} = chi D^n + (D/f)^n$

Where dynamic leverage, $chi$, is given by:

- $chi = A (product_{i} x_i^{(v_i)})/(D/f)^n$

The weighted stableswap invariant then becomes:

- $A f^n sum_{i} x_i + D = A D f^n + D^{(n+1)}/(f^n product_{i} x_i^{v_i})$

If we set equal weights $w_i = 1/n$, this reduces to the original stableswap invariant.

We define 

- $sigma := sum_{i} x_i$ 
- $pi := D^n product_{i} (w_i/x_i)^{(v_i)}$

The invariant is then expressed as:

- $A f^n sigma + D = A D f^n + D pi$     (1)

## Supply Calculation

Given a pool with weights ${w_i}$ and virtual balances ${x_i}$, we can find the equilibrium supply by solving equation (1) iteratively for $D$:

- $D_{(m+1)} = (A f^n sigma - D_m pi_m) / (A f^n - 1)$
- $pi_m = (D_m/D_{(m-1)})^n pi_{(m-1)}$
- $pi_0 = product_{i} (D_0 w_i/x_i)^{(v_i)}$    (2)

The iterative process is started with a good guess for $D_0$ (such as $sigma$) and continued until the desired precision is achieved.

### Rate Update

When updating rates, we have 

- $x_i = b_i r_i -> x_i' = b_i r_i'$ 
- $sigma -> sigma' = sigma + b_i (r_i' - r_i)$ 
- $D -> D'$ 
- $pi -> pi' = ((D')/D)^n (r_i/(r'_i))^{(v_i)} pi$

The iterative process in equation (2) is used to find both $D'$ and $pi'$, starting off with $D'_0 = D$ and $pi'_0 = (r_i/(r_i'))^{(v_i)} pi$.

## Balance Calculation

Given a pool with weights ${w_i}$, virtual balances ${x_i}_{(i != j)}$ and supply $D$, we can find the balance of a specific asset $j$ by solving equation (1) for $y := x_j$.

First, we define intermediary variables 

- $\tilde{sigma} := sum_{(i != j)} x_i$ 
- $\tilde{pi} := D^n w_j^{(v_j)} product_{(i != j)} (w_i/x_i)^{(v_i)}$

This allows us to rewrite equation (1) to

- $A f^n (\tilde{sigma} + y) + D = A D f^n +  D \tilde{pi}/y^{(v_j)}$

Rearranging gives us

- $y^{(v_j + 1)} + (\tilde{sigma} + D/(A f^n) - D) y^{(v_j)} - D/(A f_n) \tilde{pi} = 0$

This is equivalent to finding the root of $g(y) = y^{(a+1)} + b y^a - c$, which can be done iteratively using Newton's method: $y_{(m+1)} = y_m - g(y_m)/(g'(y_m))$.
Plugging in our function yields

- $y_{(m+1)} = (v_j y_m^2 + b (v_j - 1) y_m + c y_m^{(1-v_j)})/((v_j + 1) y_m + v_j b)$
- where $b = \tilde{sigma} + D/(A f^n) - D$, $c = D/(A f^n) \tilde{pi}$    (3)

### Swaps

In a swap operation, a user swaps asset $k$ for asset $l$ ($k != l$). The virtual balances change as follows:

- $x_k -> x_k' = x_k + \Delta b_k r_k$
- $x_l -> x_l' = x_l - \Delta b_l r_l$

#### Exact Input

Our goal is to find $\Delta b_l$, given $\Delta b_k$, i.e. how much of asset $l$ the user will receive (is taken out of the pool) in exchange for sending a fixed amount of asset $k$ (is added to the pool).
To that end, we solve equation (3) for $y=x_l'$, where we set the intermediary variables to

- $\tilde{sigma} = sigma + \Delta b_k r_k - x_l$
- $\tilde{pi} = (x_k/(x_k'))^{(v_k)} x_l^{(v_l)} pi$

From this we obtain the amount to send to the user:

- $\Delta b_l = (x_l - x_l')/r_l$

#### Exact Output

Alternatively we can compute $\Delta b_k$ given $\Delta b_l$, i.e. how much of asset $k$ the user will have to send (is added to the pool) in exchange for receiving a fixed amount of asset $k$ (is taken out of the pool).
In this scenario the intermediary variables are set to

- $\tilde{sigma} = sigma - x_k - \Delta b_l r_l$
- $\tilde{pi} = x_k^{(v_k)} (x_l/(x_l'))^{(v_l)} pi$

and we use equation (3) to find $y=x_k$. Finally we obtain the amount to take from the user:

- $\Delta b_k = (x_k' - x_k)/r_k$
