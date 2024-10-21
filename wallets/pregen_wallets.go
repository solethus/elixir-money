package wallets

import (
	"context"

	"encore.dev/cron"
)

const desiredWalletsInQueue = 10

var _ = cron.NewJob("pre-generate-wallets", cron.JobConfig{
	Title:    "Pre-generate Unassigned Wallets",
	Endpoint: PreGenWallets,
	Every:    1 * cron.Hour,
})

//encore:api method=GET path=/wallets/cron
func (s *Service) PreGenWallets(ctx context.Context) error {
	wallets, err := s.repo.CountUnassignedWallets(ctx)
	if err != nil {
		return err
	}

	walletsToGen := int(desiredWalletsInQueue - wallets[0])
	for i := 0; i < walletsToGen; i++ {
		_, err = s.Create(ctx)
		if err != nil {
			return err
		}
	}

	return nil
}
