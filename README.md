# The Civia Project

Based on the [Chiri](https://github.com/the3ash/astro-chiri) Astro Theme.

## Updating the fork

The `release` branch will always contain our own customizations and changes on top of the original Chiri theme.

To update our fork with the latest changes from the original Chiri theme, follow these steps:

1. Change the branch to `main`.
2. Then click **Sync fork** to pull in the latest changes from the original repository.
3. Then locally you may need to fix any merge conflicts that arise between our changes and the original Chiri theme

   ```sh
   # Switch to main branch and pull latest changes
   git checkout main
   git pull
   # Switch to release branch and rebase onto main
   git checkout release
   git pull
   git rebase main
   # If there are conflicts, resolve them and continue the rebase
   # After resolving conflicts, create a new branch to test the changes
   git checkout -b check-chiri-update
   git push -u origin check-chiri-update
   ```

   And a new preview deployment will be created for you to test the changes.
   Once you are satisfied that everything is working correctly, switch back to the `release` branch:

   ```sh
   git checkout release
   git push --force
   ```

4. After resolving any conflicts, you can push the updated `release` branch to the remote
