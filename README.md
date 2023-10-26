# AwesomeBackendServer

Le serveur permettant de fournir les services d'I.A. , et autres joyeuseries monétisées, au public !

## Stripe setup

https://www.looper.tube/?v=MbqSMgMAzxU&s=278.1&e=324.2&spd=1

## Comment tester ce serveur localement ?

A la racine du dossier serveur, Ouvre une fenetre de terminal, puis exec cette cmd pour lancer le serveur:

```
node ./index.js
```

Ouvre une autre fenetre CMD, et run cette commande, pour lancer le webhook listener:

```
stripe listen --forward-to localhost:8080/webhook
```

Fais une requete POST vers http://localhost:8080/checkout, pour obtenir une url de paiement,
et subscribe via CB.

Fais une ou plusieurs requete GET vers http://localhost:8080/myAPI?apiKey=<your_api_key>, pour simuler utilisation de l'API

Fais une requete GET vers http://localhost:8080/usage/<your_stripe_customer_id>, pour obtenir infos de billing/subscription

Prends note du API key et customer id, puis close les 2 serveurs.
Redémarre les 2 serveurs, et essaie myAPI et usage endpoints avec anciens credentials notés.
Cela devrait passer creme OK.
Supprime données Firebase, et réessaie, cela devrait etre bobo/caca

## Comment déployer ce serveur sur un serveur (;-)

To deploy your Express server on a Linode server and create a custom URL like http://maslow.io, you'll need to follow a series of steps outlined below:

1. **Sign up and log in to Linode**: If you haven't already, sign up for a Linode account and log in to the Linode Manager.

2. **Create a Linode instance**: In the Linode Manager, click on the "Create" button to create a new Linode instance. Choose the desired region, plan, and other configurations according to your needs.

3. **Deploy Ubuntu**: Once the Linode instance is created, click on the "Deploy an Image" button. Select the latest stable version of Ubuntu from the available distributions and choose it as the image to be deployed on your Linode.

4. **Configure the Linode**: Provide a suitable label for your Linode and set a root password. Choose the desired disk size, swap size, and other configuration options as per your requirements. Click on the "Deploy" button to start the deployment process.

5. **Connect to the Linode**: Once the deployment is complete, you can connect to your Linode via SSH using a terminal or an SSH client. Retrieve the Linode's IP address from the Linode Manager and use it to establish an SSH connection.

```
ssh root@<linode-ip-address>
```

```
ssh root@172.104.7.216
```

6. **Update Ubuntu**: After connecting to the Linode via SSH, it's a good practice to update the Ubuntu system packages to the latest versions. Run the following commands:

```
sudo apt update; sudo apt upgrade
```

7. **Install Node.js**: Install Node.js on your Linode by running the following commands:

```
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -; sudo apt-get install -y nodejs
```

8. **Install Nginx**: Install Nginx on your Linode server by running the following command:

```
sudo apt-get install nginx
```

9. **Clone your Express server**: Assuming you have your Express server code hosted on a repository (e.g., on GitHub), clone the repository to your Linode server using Git. Run the following command:

```
git clone <repository-url>
```

10. **Install dependencies and start the Express server**: 
Navigate to the directory where your Express server code is located 
(mine is located at /home/maslow-gpt-api) 
and install the required dependencies by running `npm install`. 
Once the installation is complete, you can start your Express server with `pm2`:

- Install `pm2` globally by running:

```
sudo npm install -g pm2
```

- Start your Express server with `pm2`:

```
pm2 start npm --name my-express-server -- start
```

Replace `my-express-server` with a suitable name for your Express server process.

**Add the Stripe webhook as a PM2 process**: Assuming the Stripe webhook is defined as an npm script in your package.json file, follow these steps:

Install stripe-cli:

https://stripe.com/docs/stripe-cli

- Start the Stripe webhook process with `pm2`:

```
pm2 start npm --name stripe-webhook -- run stripe
```

Replace `stripe` with the appropriate npm script name that starts the Stripe webhook.

Run this command so pm2 restarts automatically after a server reboot.

```
pm2 startup; pm2 save;
```

11. **Configure Nginx**: Configure Nginx to act as a reverse proxy for your Express server:

- Open the default Nginx configuration file:

```
sudo nano /etc/nginx/sites-available/default
```

- Replace the existing server { ... } piece, with the following configuration:

```
server {
    listen 80;
    server_name maslow.io;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

- Save the file and exit the text editor (Ctrl+X, Y, Enter).

- Open the /etc/nginx/nginx.conf file, and add this line to it,
to set the maximum file size allowed in your server requests
(M stands for MB, so the line below means that the max file size allowed is 50 MB..... of course that's ridiculous, so set it to a more realistic value, like 1000M (1000MB so 1GB), or anything your heart desires. This is needed so you don't get an error about file sizes being too big in requests ;-)

```
nano /etc/nginx/nginx.conf
```

```
http {
    ...
    client_max_body_size 50M; # Adjust the size as needed
    ...
}

```
12. **Enable the Nginx configuration**: Create a symbolic link from the configuration file in the `sites-available` directory to the `sites-enabled` directory to enable the configuration:

```
sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/
```

13. **Test Nginx configuration**: Run the following command to check if the Nginx configuration is valid:

```
sudo nginx -t
```

14. **Restart Nginx**: If the configuration test is successful, restart Nginx to apply the changes:

```
sudo service nginx restart
```

Now your Linode server should be set up with Nginx as a reverse proxy, your Express server running via PM2, and the Stripe webhook running as another PM2 process. The Express server should be accessible via your custom URL, and the Stripe webhook should be running in the background.

To create a URL for your server/API and link it to your Linode server, you need to follow these steps:

1. **Purchase a domain**: Choose and purchase a domain from a domain registrar of your choice. There are various domain registrars available, such as GoDaddy, Namecheap, or Google Domains. Follow the registrar's instructions to purchase the domain.

2. **Configure DNS settings**: After purchasing the domain, you need to configure the DNS settings to point the domain to your Linode server's IP address. The exact steps may vary depending on your domain registrar, but generally, you'll need to:

- Log in to your domain registrar's website.
- Locate the DNS management or DNS settings section.
- Add an "A" record or "Address" record to map the domain to your Linode server's IP address. Enter your Linode server's IP address in the record.

More info here:

https://www.linode.com/community/questions/19221/how-to-configure-a-domain-name-step-by-step-on-a-linode-server-platform

3. **Wait for DNS propagation**: DNS changes may take some time to propagate across the internet. It usually takes a few minutes to a few hours, but it can occasionally take up to 24-48 hours. Be patient and allow time for the changes to propagate.

4. **Configure Nginx with the new domain, and increase the request timeout duration**: Once the DNS changes have propagated, you can configure Nginx to use the new domain. Open the Nginx configuration file:

```
sudo nano /etc/nginx/sites-available/default
```

Update the `server_name` directive with your domain:

```nginx
server {
listen 80;
server_name your-domain.com;

location / {
proxy_pass http://localhost:8080;
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
}
}
```

Save the file (Ctrl+O in nano) and exit the text editor (Ctrl+X in nano).

To avoid Nginx 504 errors, we need to increase the request timeout duration. Open the Nginx configuration file:

```
sudo nano /etc/nginx/nginx.conf
```

Add new timeouts to the http object:

```nginx
http {
    proxy_read_timeout 600;
    proxy_connect_timeout 600;
    proxy_send_timeout 600;

    .....
}
```

Save the file (Ctrl+O in nano) and exit the text editor (Ctrl+X in nano).

5. **Enable the Nginx configuration**: Create a symbolic link from the configuration file in the `sites-available` directory to the `sites-enabled` directory to enable the configuration:

```
sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/
```

6. **Test the Nginx configuration**: Run the following command to check if the Nginx configuration is valid:

```
sudo nginx -t
```

If the configuration test is successful, you should see a message indicating that the configuration is valid.

7. **Restart Nginx**: If the configuration test is successful, restart Nginx to apply the changes:

```
sudo service nginx restart
```

Nginx will now be configured to use your new domain for your server/API.

Remember, it may take some time for the DNS changes to propagate fully. Once the changes have propagated, you should be able to access your server/API using the new domain name.

8. **HTTPS Setup**:

https urls are more secure, so it's a must have, for safety and 'trustability' 
(I create new words sometimes ;-)

https://www.linode.com/docs/guides/enabling-https-using-certbot-with-nginx-on-ubuntu/

9. **Private Email Setup**:

In order to send emails to your API clients, you need a private business email,
so you don't get obliterated by anti-spam filters.

https://www.linode.com/community/questions/17732/how-to-configure-dns-for-namecheap-private-email


## pm2 shyt

pm2 dispose de:

pm2 start:
pm2 logs:
pm2 status:
pm2 list: Lists all running processes and their status.
pm2 stop <app_name|app_id>: Stops a specific application.
pm2 restart <app_name|app_id>: Restarts a specific application.
pm2 delete <app_name|app_id>: Deletes a specific application from pm2 (stops and removes it from the pm2 process list).

## Pour redémarer le Serveur Linode

```
sudo reboot
```

Une fois fait, rends toi vers https://cloud.linode.com/linodes
et attend que ton serveur soit relancé. Cela prendra environ 1 minute.

Une fois relancé, reconnecte toi via SSH 

```
ssh root@<linode_ip>
```

Une fois connecté à Linode, run cette commande pour voir les processus pm2 en cours:

```
pm2 list
```

Si tu as bien suivi tout le setup convenablement, alors ceci devrait être affiché:

root@localhost:~# pm2 list
┌────┬──────────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name                 │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├────┼──────────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 1  │ my-express-server    │ default     │ N/A     │ fork    │ 753      │ 11m    │ 0    │ online    │ 0%       │ 68.4mb   │ root     │ disabled │
│ 0  │ stripe-webhook       │ default     │ N/A     │ fork    │ 752      │ 11m    │ 0    │ online    │ 0%       │ 68.9mb   │ root     │ disabled │
└────┴──────────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
root@localhost:~#

Si par le plus grand des malheurs, la liste est vide
(Si tu as bien suivi tout le setup convenablement, alors cela ne devrait pas être un problème)
alors dirige toi vers le folder de serveur

```
cd /home/<server_folder_name>
```

et exécute cette commande pour relancer les processus pm2, et nginx:

```
npm run restart-server
```

re-run pm2 list pour voir les changements !

## To permanently set Github username/password

you can set up Git to use SSH authentication instead, which is more secure and convenient.

Here are the steps to fix this issue:

1. **Generate SSH Key Pair (if you don't already have one):**
   If you don't already have an SSH key pair, you can generate one using the following command:

   ```bash
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   ```

   Replace `your_email@example.com` with your actual email address. You can leave the passphrase empty if you want to avoid entering it every time.

2. **Add Your SSH Public Key to Your Git Provider:**

   Display the SSH key with

   Ubuntu
   ```
   cat ~/.ssh/id_rsa.pub
   ```

   Windows CMD
   ```
   type %userprofile%\.ssh\id_rsa.pub
   ```

   Windows Powershell
   ```
   Get-Content $env:userprofile\.ssh\id_rsa.pub
   ```

   Copy the whole ssh-rsa ...... stuff, then go to this page in your Github account

   https://github.com/settings/ssh/new

   and create a SSH entry for your server/computer. Paste this SSH where needed.

3. **Update Your Git Remote URL:**
   Change your Git remote URL from HTTPS to SSH. You can do this using the following command:

   ```bash
   git remote set-url origin git@github.com:user/repo.git
   ```

   Replace `git@github.com:user/repo.git` with the SSH URL of your Git repository.

4. **Test SSH Authentication:**
   To make sure SSH authentication is working, you can run the following command:

   ```bash
   ssh -T git@github.com
   ```

   Replace `github.com` with the hostname of your Git provider. You should see a message indicating successful authentication.

   Something like:

   Hi <YOUR_GITHUB_USERNAME>! You've successfully authenticated, but GitHub does not provide shell access.

5. **Perform a Git Pull:**
   Now, when you run `git pull` on the server side, it should use SSH authentication, and you won't be prompted for a username and password.

By following these steps, you'll set up SSH authentication for your Git repository, which is more secure and should eliminate the need to enter your credentials every time you perform Git operations.

## Remote server debugging (How To Set breakpoints in your server code, and step through the shizzle)

Thanks to this page: https://www.digitalocean.com/community/tutorials/how-to-debug-node-js-with-the-built-in-debugger-and-chrome-devtools

Here's a breakdown:

To set breakpoints and debug your Express server running on Linode,
using your local Chrome browser on your laptop, you can follow these steps:

*) Install and Configure Chrome: 

Ensure that you have Google Chrome installed on your laptop. 
If not, download and install it from the official website.

*) Push your server side code, with breakpoints in it, so you can pull it on the server side very soon

npm run push

*) Start the Express Server: 

SSH into your Linode server

```
ssh <linode_user_name>@<linode_ip_addr>
```

```
ssh root@172.104.7.216
```

and navigate to the directory where your Express server is located.

```
cd path/to/server/folder
```

```
cd /home/maslow-gpt-api
```

Pull le code frais

git pull

Stop the server if running:

root@localhost:/home/maslow-gpt-api# pm2 list


┌────┬──────────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name                 │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├────┼──────────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 1  │ my-express-server    │ default     │ N/A     │ fork    │ 177873   │ 8s     │ 0    │ online    │ 0%       │ 74.2mb   │ root     │ disabled │
│ 0  │ stripe-webhook       │ default     │ N/A     │ fork    │ 738      │ 14D    │ 0    │ online    │ 0%       │ 30.4mb   │ root     │ disabled │
└────┴──────────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘


root@localhost:/home/maslow-gpt-api# pm2 stop 1


┌────┬──────────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name                 │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├────┼──────────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 1  │ my-express-server    │ default     │ N/A     │ fork    │ 0        │ 0      │ 0    │ stopped   │ 0%       │ 0b       │ root     │ disabled │
│ 0  │ stripe-webhook       │ default     │ N/A     │ fork    │ 738      │ 14D    │ 0    │ online    │ 0%       │ 30.0mb   │ root     │ disabled │
└────┴──────────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘


- Start your Express debug server with `pm2`:

```
pm2 start npm --name my-express-debug-server -- run start_debug
```

or 

pm2 restart <my-express-debug-server's id>

if the my-express-debug-server entry already exists in the pm2 list

Replace `my-express-debug-server` with a suitable name for your Express server process, if you want to.

Ensure that the server is running and take note of the port used, with the help of 

pm2 logs <my-express-debug-server's id>

root@localhost:/home/maslow-gpt-api# pm2 logs 4
[TAILING] Tailing last 15 lines for [4] process (change the value with --lines option)
/root/.pm2/logs/my-express-debug-server-error.log last 15 lines:
4|my-expre | Debugger listening on ws://127.0.0.1:9229/71228168-8c11-4316-8860-4a9ab0ebea9a
4|my-expre | For help, see: https://nodejs.org/en/docs/inspector
...
...
...

Usually it's 9229, but yours may vary

*) Enable Port Forwarding: On your laptop, open a terminal or command prompt. 
Enter the following command to enable port forwarding from your Linode server to your laptop:

```bash
ssh -L <port_noted_above>:localhost:<port_noted_above> <linode_user_name>@<linode_ip_addr>
```

```
ssh -L 9229:localhost:9229 root@172.104.7.216
```
Keep this terminal open throughout the debugging process.

*) Access Chrome DevTools: Open Chrome on your laptop, 
and enter the following URL in the address bar:

```
chrome://inspect
```

*) Configure Target: Under the "Devices" section, click on the "Configure" button,
next to "Discover network targets". 

Add the hostname and port noted above
(e.g., `localhost:9229`). 

Click "Done".

*) Discover Targets: Click on the "Discover" button to find your newly configured target 
(your Linode server). It should appear in the list below.

*) Inspect: Under the "Remote Target" section, click on the "inspect" link,
next to your Linode server target. This will open Chrome DevTools for your Express server.

*) Debug: In the newly opened Chrome DevTools window, navigate to the "Sources" tab. 
You should see your Express server code. 
Locate the `debugger;` line you added in step 4,
and set breakpoints by clicking on the line numbers.

*) Trigger Breakpoint: 

Perform an action (e.g., send a request) that would execute the code
where you set the breakpoint. 

The execution will pause when it reaches the breakpoint, 
and you can inspect variables, step through the code, etc.

That's it! You have successfully set breakpoints,
and can debug your Express server running on Linode using Chrome on your laptop. 

### Pour appliquer un correctif une fois le setup ci dessus fait

Push le folder local de serveur:

npm run push

Pull le folder sur le serveur, et update les libs:

git pull
npm install

redémarre le serveur debug

pm2 list
pm2 restart <id du serveur debug>

Ferme la fenetre de devtools déja ouverte, si déja ouvert,
puis refresh la page chrome://inspect et réouvre inspector dev DevTools

Enjoy !

## Placeholders in this codebase

### package.json

<LINODE_IP> = the Linode server IP Address

<YOUR_GITHUB_URL> = the git@github url of your repo

### index.js

<STRIPE_SECRET_KEY> = The secret key of your Stripe account, available here: 
https://dashboard.stripe.com/test/apikeys

### src/AppConstants/Constants.js

<OPENAI_API_KEY> = The OpenAI account API Key

<cloudinary_cloud_name> = The cloud name of your Cloudinary account.

<cloudinary_upload_preset> = The Upload preset of your Cloudinary account.

<cloudinary_api_key> = The Cloudinary account api key

<cloudinary_api_secret> = The Cloudinary account api secret

### src/endpoints/checkoutEndpoint/pieces/_checkoutEndpoint/_checkoutEndpoint.js

<STRIPE_TRANSACTION_TYPE> = The Stripe transaction type

<STRIPE_PAYMENT_TYPE> = The Stripe payment type during the subscription transaction

<STRIPE_ITEM_PRICE_ID> = The Stripe item price id

<API_URL> = The Base URL of your API/Server (for ex. https://my.ultra.api.io)

### src/endpoints/webhookEndpoint/pieces/_webhookEndpoint/_webhookEndpoint.js

<webhookSecret> = The Stripe Webhook secret

### src/endpoints/webhookEndpoint/pieces/OnAPICheckoutSuccess/OnAPICheckoutSuccess.js

<PostmarkServerToken> = The Postmark server token (private email)

<YOUR_PRIVATE_EMAIL> = Your private email address

### .env

<CLOUDINARY_URL> = The Cloudinary URL of your account, looking like 
cloudinary://s4m3gibb3rysh@dpuvodetp

## Troubleshooting

En cas d'erreur du genre:

```
time="Sun, 15 Oct 2023 22:35:53 UTC" level=fatal msg="Error while authenticating with Stripe: Authorization failed, status=401, body={
0|stripe-w |   "error": {
0|stripe-w |     "code": "api_key_expired",
0|stripe-w |     "doc_url": "https://stripe.com/docs/error-codes/api-key-expired",
0|stripe-w |     "message": "Expired API Key provided: rk_test_*********************************************************************************************qhyLI9",
0|stripe-w |     "type": "invalid_request_error"      
0|stripe-w |   }
0|stripe-w | }
0|stripe-w | "
....
```

Utilise stripe login, car la cle API de login est expiree

