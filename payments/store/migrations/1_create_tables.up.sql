CREATE TABLE IF NOT EXISTS payments
(
    id              SERIAL PRIMARY KEY,
    sender_id       VARCHAR(255),
    receiver_id     VARCHAR(2),
    amount_usdc     VARCHAR(20),
    payment_date    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
