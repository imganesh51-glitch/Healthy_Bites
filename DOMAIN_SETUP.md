# 🌐 Connect Your Namecheap Domain to Vercel

This guide will help you connect your custom domain from Namecheap to your "Aaditya's Healthy Bites" Vercel deployment.

## Prerequisites
- ✅ Domain purchased on Namecheap
- ✅ Website deployed on Vercel (from GitHub repo: imganesh51-glitch/Healthy_Bites)

---

## Step 1: Add Domain to Vercel

### 1.1 Access Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and sign in
2. Select your **Healthy_Bites** project
3. Click on **Settings** at the top
4. Click on **Domains** in the left sidebar

### 1.2 Add Your Domain
1. In the "Domains" section, you'll see an input field
2. Enter your domain name (example: `healthybites.com` or `aadityashealthybites.com`)
   - Add both versions: `example.com` and `www.example.com`
3. Click **Add**

### 1.3 Note the DNS Records
After adding the domain, Vercel will show you the DNS records you need to configure:

**For Root Domain (example.com):**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21`

**For WWW Subdomain (www.example.com):**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

---

## Step 2: Configure DNS in Namecheap

### 2.1 Access Namecheap DNS Settings
1. Log into [Namecheap](https://www.namecheap.com/)
2. Click on **Domain List** in the left sidebar
3. Find your domain and click **Manage**
4. Scroll down to **Nameservers** section
5. Make sure it's set to **Namecheap BasicDNS** (if not, select it)
6. Go to the **Advanced DNS** tab

### 2.2 Add DNS Records

**Delete Default Records (if any):**
- Remove any existing `A Record` pointing to a parking page
- Remove any existing `CNAME Record` for `www`

**Add New Records:**

#### Record 1: Root Domain A Record
```
Type: A Record
Host: @
Value: 76.76.21.21
TTL: Automatic
```

#### Record 2: WWW CNAME Record
```
Type: CNAME Record
Host: www
Value: cname.vercel-dns.com.
TTL: Automatic
```

**Important Notes:**
- Make sure there's a period (`.`) at the end of `cname.vercel-dns.com.` in the CNAME record
- If you see a "URL Redirect Record", you can leave it or remove it

### 2.3 Save Changes
1. Click the **Save all changes** button (green checkmark)
2. Wait for confirmation

---

## Step 3: Verify Domain in Vercel

### 3.1 Check Status
1. Go back to your Vercel project **Settings > Domains**
2. You should see your domain with a status indicator
3. Initially, it might show "Invalid Configuration" or "Pending"

### 3.2 Wait for DNS Propagation
- DNS changes can take **5-60 minutes** to propagate
- In some cases, it may take up to **48 hours** (rare)
- Vercel will automatically verify once DNS propagates

### 3.3 Set Primary Domain (Optional)
Once verified, you can set which domain is primary:
1. Click the three dots (**...**) next to your preferred domain
2. Select **Set as Primary Domain**
3. This is the domain that will be used for SEO and redirects

---

## Step 4: SSL Certificate (Automatic)

Vercel automatically provisions an SSL certificate for your domain using Let's Encrypt.

- No manual configuration needed
- Certificate is issued within a few minutes of DNS verification
- Your site will be accessible via `https://` automatically

---

## Common Issues & Troubleshooting

### Issue 1: Domain Shows "Invalid Configuration"
**Solution:**
- Wait 15-30 minutes for DNS to propagate
- Check that the A record is exactly `76.76.21.21`
- Ensure CNAME is `cname.vercel-dns.com.` (with period)

### Issue 2: "Too Many Redirects"
**Solution:**
- Remove any URL Redirect records in Namecheap
- Make sure SSL/TLS is set to "Full" (not "Flexible") if using Cloudflare

### Issue 3: DNS Not Propagating
**Check DNS:**
```bash
# Check if DNS has propagated
nslookup yourdomain.com
dig yourdomain.com
```

**Online Tools:**
- [whatsmydns.net](https://www.whatsmydns.net/)
- [dnschecker.org](https://dnschecker.org/)

### Issue 4: "Domain Already in Use"
**Solution:**
- Domain might be added to another Vercel account
- Contact Vercel support to transfer domain
- Or use a different domain/subdomain

---

## Recommended DNS Configuration

For best performance, add these optional records:

### MX Records (for Email - if needed later)
```
Type: MX Record
Host: @
Value: [Your email provider's MX records]
Priority: [As per provider]
```

### TXT Records (for Email Verification - if needed)
```
Type: TXT Record
Host: @
Value: [SPF/DKIM records from email provider]
```

---

## Post-Setup Verification

### Test Your Domain
1. Visit `https://yourdomain.com` in a browser
2. Visit `https://www.yourdomain.com` in a browser
3. Both should load your Healthy Bites website
4. Check that HTTPS (lock icon) is working

### Update Environment Variables (if applicable)
If you have any URLs hardcoded in your app:
1. Go to Vercel **Settings > Environment Variables**
2. Update `NEXT_PUBLIC_SITE_URL` or similar to your new domain
3. Redeploy if needed

---

## Quick Reference: What Domain Should I Use?

**Popular Options for Your Business:**
- `healthybites.com` - Short and memorable
- `aadityshealthybites.com` - Brand-focused
- `aadityashealthybites.com` - Full name
- `organicbabyfood.in` - Descriptive (if available)

**Recommendation:** Choose something short, memorable, and relevant to your brand!

---

## Need Help?

If you encounter issues:
1. Check the [Vercel Domains Documentation](https://vercel.com/docs/concepts/projects/domains)
2. Contact Vercel Support through your dashboard
3. Reach out to Namecheap Support for DNS issues

---

## Summary Checklist

- [ ] Add domain in Vercel (Settings > Domains)
- [ ] Note the DNS records provided by Vercel
- [ ] Configure A Record in Namecheap DNS (`@` → `76.76.21.21`)
- [ ] Configure CNAME Record in Namecheap DNS (`www` → `cname.vercel-dns.com.`)
- [ ] Wait 15-60 minutes for DNS propagation
- [ ] Verify domain is active in Vercel
- [ ] Test both `yourdomain.com` and `www.yourdomain.com`
- [ ] Ensure HTTPS is working
- [ ] Set primary domain in Vercel (optional)

---

**Your website will be live at your custom domain once DNS propagates! 🎉**
