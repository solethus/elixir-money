DELETE FROM users
WHERE id NOT IN (
    SELECT id
    FROM users
    ORDER BY id DESC
    LIMIT 3
);
