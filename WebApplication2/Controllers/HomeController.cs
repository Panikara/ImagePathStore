using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication2.Controllers
{
    public class HomeController : Controller
    {
        RegisterDbEntities dbContent = new RegisterDbEntities();
        // GET: Home
        public ActionResult GetNames()
        {
            RegisterDbEntities dbContent = new RegisterDbEntities();
            List<tblRegistration> userNames = dbContent.tblRegistrations.ToList();
            return Json(userNames, JsonRequestBehavior.AllowGet);
        }
        public ActionResult AllDetails()
        {
            List<tblRegistration> detailsInfo = dbContent.tblRegistrations.ToList();
            return Json(detailsInfo, JsonRequestBehavior.AllowGet);
        }
        public ActionResult OneRecord(int? id)
        {
            tblRegistration oneData = dbContent.tblRegistrations.Find(id);
            return Json(oneData, JsonRequestBehavior.AllowGet);
        }
        public void UploadFiles()
        {
            //DbContext
            RegisterDbEntities2 db = new RegisterDbEntities2();

            //FolderCreation
            string path = Server.MapPath("~/Uploads/");
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            var fileCheck = Request.Files[0];

            // this for multi files check
           // foreach (string key in Request.Files)
           // {

           //single file check
            HttpPostedFileBase postedFile = fileCheck;
                postedFile.SaveAs(path + postedFile.FileName);

                string Url = "Uploads/" + postedFile.FileName;


                fileInfo fileInfo2 = new fileInfo();
                fileInfo2.filepath = Url;

                db.fileInfoes.Add(fileInfo2);
                db.SaveChanges();
           // }
            
        }

        public ActionResult GetAllInfo()
        {
            RegisterDbEntities2 db = new RegisterDbEntities2();
            List<fileInfo> fileinfo = db.fileInfoes.ToList();
            return Json(fileinfo,JsonRequestBehavior.AllowGet);
        }
        
    }
}