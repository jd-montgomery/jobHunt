using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.OData.Builder;
using System.Web.OData.Extensions;

namespace WebApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
			//ODataModelBuilder builder = new ODataConventionModelBuilder();
			//builder.EntitySet<Product>("Products");
			//config.MapODataServiceRoute(
			//	routeName: "ODataRoute",
			//	routePrefix: null,
			//	model: builder.GetEdmModel());

            // Web API routes
            config.MapHttpAttributeRoutes();

			// api is deployed to /api so no need for this prefix
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
