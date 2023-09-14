# Weighted Stableswap

## Invariant Derivation

The invariant derivation is a way to ensure that the total value in the pool remains constant, even as the individual assets' values change. This is done by setting up two equations:

1. The sum of all virtual balances (the amount of each asset adjusted for its weight) equals a constant.

2. The product of each virtual balance raised to its corresponding weight (a measure of its importance in the pool) equals a constant.

These two equations form the basis of the weighted stableswap invariant, which ensures that the value of the pool remains constant. It's similar to Curve's stableswap invariant, but it allows for unequal weights among the assets. If you input equal weights into our invariant, it will reduce to Curve's invariant.

## Supply Calculation

To calculate the supply of the pool, we use an iterative process to solve the invariant equation for the total supply, D. This process starts with a guess for D and continues until the desired precision is achieved. 

During this process, the rates of the assets are also updated to reflect changes in their values. The rate providers are external contracts that provide the current exchange rate for each asset.

## Balance Calculation

To find the balance of a specific asset, we solve the invariant equation for that asset's virtual balance. This involves using an iterative method, similar to the one used in the supply calculation.

This method can also be used to calculate the amount of one asset a user will receive or have to send in a swap operation.

## Swaps

In a swap operation, a user trades one asset for another. The amount of each asset involved in the swap is calculated using the balance calculation method. 

If the user wants to send a fixed amount of one asset and receive an unknown amount of another, we solve the balance equation for the received asset. Conversely, if the user wants to receive a fixed amount of one asset and send an unknown amount of another, we solve the balance equation for the sent asset.

In both cases, the goal is to ensure that the value of the pool remains constant, even as the individual assets' values change.

## LP Token (yETH)

The Liquidity Provider (LP) token for this system is yETH. When users deposit their assets into the pool, they receive yETH in return. The amount of yETH they receive is proportional to the amount they deposit and the current supply of yETH. Users can redeem their yETH for the underlying assets at any time.

## Yield and Slashings

Yield and slashings are two factors that can affect the value of the assets in the pool. Yield is the return earned on the assets, while slashings are penalties imposed for misbehavior. 

These factors are taken into account when calculating the rates and balances of the assets. If an asset's yield increases or it is slashed, its rate will change, which will in turn affect its balance and the total value of the pool.

## Bands

Bands are ranges within which the weights of the assets can fluctuate. If an asset's weight goes outside its band, it will be rebalanced to bring it back within the band. This ensures that the pool remains diversified and balanced, optimizing the risk and yield distribution among the assets.

## Math: Invariant Derivation

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

## Math: Supply Calculation

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

## Math: Balance Calculation

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

### Math: Swaps

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
