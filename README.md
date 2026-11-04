# RestroQR

RestroQR helps customers at Olive & Ember browse food and order from their table without an account. Staff receive and accept orders, and owners and managers keep the menu and table list current. This app keeps records in the current browser, with separate storage for each app version.

## Browse the menu

Scan a table’s QR code to open its menu. The table name stays at the top of every page. Choose Mains, Sides or Drinks, then use Add and the quantity controls. Review shows quantities and the total before anything is sent. The home page opens Table 12; other tables open through their own menu links. An unrecognized or removed table link shows instructions to ask staff for help.

## Place an order

Choose Review, check the dishes and quantities, then choose Send order. No account or personal information is required. Your order is linked to your table and shown as awaiting staff acceptance. Preparation starts only after the team accepts it. Menu, review and send form the short ordering journey; actual two-minute completion depends on the customer and device.

## Add extra food

Open Our order and choose Add more food. Extra dishes are reviewed separately, then sent into the same unpaid table order. Original items retain their status. Extras are labeled awaiting acceptance and cannot enter preparation until staff accept them. After an order is paid, the next submission starts a new order.

## Choose how to pay

Open Our order and choose Choose how to pay. Choose staff payment to see instructions for paying the team at your table. The order remains unpaid until staff confirm that payment was received. Staff confirmation updates the customer order when it is open in another tab of the same browser.

The phone option opens its own payment page with retry and a return to staff payment. A hosted payment provider has not been connected, so no online charge can be completed here. RestroQR collects no card numbers, expiry dates or security codes, and never marks an unavailable or cancelled phone payment as paid. A real phone checkout requires the confirmed provider and a server connection before it can accept money.

## Staff sign-in and roles

Use Staff sign in at the bottom of the customer menu. Choose a team member and enter their access code: Maya Rahman, manager, 1212; Elliot Brooks, staff, 2468; Nora Ellis, owner, 8080. Staff reach orders. Owners and managers also reach Menu and Tables & QR. A staff member opening an administration link receives a manager-access message and a return to orders. Sign out from the workspace sidebar.

These access codes select local workspaces. They are shipped in the app and provide no production authentication. Browser records can be inspected or changed by someone with access to browser storage. Real table isolation and restaurant permissions require server authorization; keep customer table links private.

## Receive and accept orders

In Orders, switch between Incoming and Accepted and choose a table. Check its reference, items and amount. Accept order or Accept extra items enables preparation only for those pending items. Use Mark accepted items as preparing, then Mark prepared items as served to update their progress. Unavailable items block acceptance until a replacement is resolved. To record money received at the table, choose Confirm staff payment and confirm the current amount only after receiving it.

## Agree a replacement

In an order, choose Arrange a replacement and identify the unavailable dish. Visit the table and discuss an available alternative. Select the agreed dish, review its quantity and changed total, then confirm that the customer agreed. Save agreed replacement is enabled only after that confirmation. The changed item names the original dish it replaces and still requires staff acceptance. Paid orders cannot have their dishes replaced.

## Keep the menu current

Owners and managers open Menu to search dishes, add a menu item, edit its details or change its availability. Enter a name, description, category and a price between 0 and 10000. Save changes updates the customer menu. Remove asks for confirmation. Existing orders keep the dish name and price recorded when they were sent.

## Manage tables and QR codes

Keep the menu current first, then open Tables & QR to add tables and unique names with 1–30 seats. Select a table to see its own QR. Use Download QR to save a scalable SVG for printing, or Open table menu to inspect its destination. Scan printed codes before placing them at tables. Renaming a table keeps its link. Tables with an unpaid order cannot be removed; removing another table invalidates its menu link while retaining previous order records.

## Live updates and saved records

Orders, menu changes and tables are saved locally. Open the customer menu and staff Orders in two tabs at the same preview address and version to see changes without refreshing. Independent table updates are retained, and a changed total must be reviewed before staff payment is confirmed. This local synchronization does not connect separate phones, browsers or devices. If browser storage is unavailable, keep the tab open: the app warns that changes cannot survive a reload. Customer baskets are kept separately for each table.

## Preview and settings

The surrounding host runs the existing Vite production build after the source is delivered and supplies the preview site. Hash-based table links support static hosting and phone browsers. Preview deployment and phone-load timing need verification on that hosted address. No build or deployment command was run while preparing these files.

Public app settings read the actual product identity from blocks-project.json: Df4b87349868545ce8dfcf30cc7c358be. No provider keys or server secrets are included in the browser app. Values use plain numbers, with no currency sign, currency code or tax line. Order references use RES- followed by a number, such as RES-10428. The product date is 2026-11-03 and the starting order records are dated 2026-11-02. No payout schedule is configured.
