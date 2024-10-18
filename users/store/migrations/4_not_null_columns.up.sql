alter table users
    alter column surname set not null;

alter table users
    alter column country_code set not null;

alter table users
    alter column phone_number set not null;

alter table users
    alter column fiat_wallet_currency set not null;

alter table users
    alter column updated_at set not null;

alter table users
    alter column created_at set not null;
