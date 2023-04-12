# Encrypted-Secret

"Encrypted Secret" is a Google Chrome extension that provides secure storage for users' secrets.

Upon installation, the extension needs to be initialized by the user.
The user will be prompted to enter a secret, which will be encrypted with a password of at least 4 characters and saved locally.

Afterward, the user must verify their password to access their secret.
In the dashboard, the user can regenerate their secret or log out. 
If the user clicks "log out", a modal will appear to confirm if they want to reset their data or just exit.

If the user chooses to reset their data, they will need to initialize the extension again the next time they open it. 
If not, they will be prompted to verify their password and given access to the user dashboard.

link: [https://chrome.google.com/webstore/detail/encrypted-secret/cflfnmdiiaejddjhigcenklomaghpano?hl=en&]

## Technical details

Developed with ReactJS and CSS.

## Views

<img src="/assets/images/initial.png" width="40%">
<img src="/assets/images/password.png" width="40%">
<img src="/assets/images/secret.png" width="40%">
<img src="/assets/images/modal.png" width="40%">

## Out-of-scope
  
* Error messages are not available now, working on this feature.