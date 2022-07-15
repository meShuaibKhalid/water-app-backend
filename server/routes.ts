/**
 * Sets up routes for Water App Api
 * @param app Express App
 */
export const routes = (app: any) => {
    app.use("/api/v1/users" , require('./api/user'));
    app.use("/api/v1/hydration", require('./api/hydration'));
    app.use("/api/v1/notify", require('./api/user-notification'))
}
