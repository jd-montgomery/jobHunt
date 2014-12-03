using Breeze.ContextProvider;
using Breeze.ContextProvider.EF6;
using Breeze.WebApi2;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.Models;

namespace WebApi.Controllers
{
	[BreezeController]
	public class JobHuntController : ApiController
	{
		readonly EFContextProvider<JobHuntDbContext> _contextProvider = new EFContextProvider<JobHuntDbContext>();

		// ~/breeze/jobhunt/Metadata 
		[HttpGet]
		public string Metadata()
		{
			return _contextProvider.Metadata();
		}

		// ~/breeze/jobhunt/Jobs
		// ~/breeze/jobhunt/Jobs?$filter=IsArchived eq false&$orderby=CreatedAt 
		[HttpGet]
		public IQueryable<Job> Jobs()
		{
			return _contextProvider.Context.Jobs;
		}

		// ~/breeze/jobhunt/Companies
		// ~/breeze/jobhunt/Companies?$filter=IsArchived eq false&$orderby=CreatedAt 
		[HttpGet]
		public IQueryable<Company> Companies()
		{
			return _contextProvider.Context.Companies;
		}

		// ~/breeze/jobhunt/Recruiters
		// ~/breeze/jobhunt/Recruiters?$filter=IsArchived eq false&$orderby=CreatedAt 
		[HttpGet]
		public IQueryable<Recruiter> Recruiters()
		{
			return _contextProvider.Context.Recruiters;
		}

		// ~/breeze/jobhunt/Submissions
		// ~/breeze/jobhunt/Submissions?$filter=IsArchived eq false&$orderby=CreatedAt 
		[HttpGet]
		public IQueryable<Submission> Submissions()
		{
			return _contextProvider.Context.Submissions;
		}

		// ~/breeze/jobhunt/SaveChanges
		[HttpPost]
		public SaveResult SaveChanges(JObject saveBundle)
		{
			return _contextProvider.SaveChanges(saveBundle);
		}
	}
}