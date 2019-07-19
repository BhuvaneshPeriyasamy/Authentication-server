var controller=require('../Controller/controller');

module.exports=function(app)
{
    app.route("/auth").post(controller.Authentication);
    app.route("/Admin").get(controller.RestrictToAdmin);
    app.route("/Normal").get(controller.CommonMethod);
}