const router = require('express').Router();
const fetch = require('../../lib/apiHelper');
const sessionStorage = require('sessionstorage');
const {envConfig} =require('../../envConfig');
const apiUrl = envConfig.API_URL;

const Logger = require('../../LoggerService');
const logger = new Logger('CS-API');

const distributorApi = envConfig.DISTRIBUTOR_API_URL + 'api/';

router.get('/home/getUserAccess', async (req, res) => {
  try {
    const header = {
      'Ocp-Apim-Subscription-Key': envConfig.DMS_API_SUBSCRIPTION_KEY,
    };
    const sessionId = req.sessionID;
    // const reqBody = {
    //   CompanyId: "KLTD",
    //   UploadAccess: "1",
    //   ViewChildDocuments: "1",
    //   ViewDocumentAccess: "1",
    //   criteria: {
    //       CompanyId: "998",
    //       CompanyName: "KLTD",
    //       UserName: "bersysb@softura.com"
    //   },
    //   searchKeyWord: ""
    // };
    // const docType = await fetch.callPost(distributorApi + 'DocumentCenter/GetDocumentType',reqBody,header);
    // res.json({
    //   rc: 0,
    //   message: 'Success',
    //   data: docType        
    // })

    const userDetails = sessionStorage.getItem(sessionId);
    //const userEmail = 'superUser@softura.com';
    //const userInfo = await fetch.callGet(envConfig.API_URL + '/home/getUserDepartmentAccess?email=' + userEmail);
    const userInfo = {
      "rc": 0,
      "message": "Success",
      "data": {
        "category1": [
          {
            "category1": "Brand Management",//nc
            "name": "Brand Management",
            "id": "405",
            "isChild": true
          },
          {
            "category1": "DirectLinkCategory1",//nc
            "name": "DirectLinkCategory1",
            "id": "401",
            "isChild": true
          },
          {
            "category1": "Field Assembly Manual",//c
            "name": "Field Assembly Manual",
            "id": "7",
            "isChild": false
          },
          {
            "category1": "Operation and Maintenance Manual",//c
            "name": "Operation and maintenance manual",
            "id": "1",
            "isChild": false
        }
        ],
        "claim": [
          "edit",
          "read",
          "subscribe",
          "upload",
          "write",
          "admin",
          "delete",
          "edit",
          "read",
          "subscribe",
          "upload",
          "admin",
          "delete",
          "edit",
          "read",
          "subscribe",
          "upload",
          "all department"
        ],
        "userDetails": {
          "userId": 1,
          "firstName": userDetails?.firstName,
          "lastName": userDetails?.lastName,
          "email": userDetails?.userEmail
        },
        "userPreferences": {
          "preference_id": 3,
          "userid": 1,
          "preferences": {
            "fileType": [
              0
            ],
            // "gridData": {
            //   "Purchasing": {
            //     "searchGrid": [
            //       "File Name",
            //       "Sub Document Type",
            //       "Product Line",
            //       "Location",
            //       "Category",
            //       "Commodity Family",
            //       "Commodity",
            //       "Contract Expiration",
            //       "Contract Start Date",
            //       "Contract End Date",
            //       "Buyers Name",
            //       "Purchasing Manager",
            //       "Supplier Name",
            //       "Supplier ID",
            //       "Supplier Email",
            //       "Diversity Supplier",
            //       "Status",
            //       "Auto Renewal Term Length",
            //       "Notice Period (# of Days)",
            //       "Payment Terms",
            //       "Total Contract Value",
            //       "Cancellation Cost",
            //       "Last Modified By",
            //       "Last Modified Date"
            //     ],
            //     "favoriteGrid": [
            //       "Last Modified Date",
            //       "File Name",
            //       "Business Area",
            //       "Document Types",
            //       "Sub Document Type",
            //       "Product Line",
            //       "Region",
            //       "Country",
            //       "Location",
            //       "Category",
            //       "Commodity Family",
            //       "Commodity",
            //       "Contract Expiration",
            //       "Contract Start Date",
            //       "Contract End Date",
            //       "Buyers Name",
            //       "Purchasing Manager",
            //       "Supplier Name",
            //       "Supplier ID",
            //       "Supplier Email",
            //       "Diversity Supplier",
            //       "Status",
            //       "Auto Renewal Term Length",
            //       "Notice Period (# of Days)",
            //       "Payment Terms",
            //       "Total Contract Value",
            //       "Cancellation Cost",
            //       "Last Modified By"
            //     ],
            //     "myDocumentGrid": [
            //       "Last Modified Date",
            //       "Upload Status",
            //       "Sub Document Type",
            //       "Product Line",
            //       "Region",
            //       "Country",
            //       "Location",
            //       "Category",
            //       "Commodity Family",
            //       "Commodity",
            //       "Contract Expiration",
            //       "Contract Start Date",
            //       "Contract End Date",
            //       "Buyers Name",
            //       "Purchasing Manager",
            //       "Supplier Name",
            //       "Supplier ID",
            //       "Supplier Email",
            //       "Diversity Supplier",
            //       "Status",
            //       "Auto Renewal Term Length",
            //       "Notice Period (# of Days)",
            //       "Payment Terms",
            //       "Total Contract Value",
            //       "Cancellation Cost",
            //       "Last Modified By"
            //     ]
            //   },
            //   "Supply Chain": {
            //     "searchGrid": [
            //       "Document Types",
            //       "Department",
            //       "Region",
            //       "Location",
            //       "Location ID",
            //       "OEM",
            //       "Carrier",
            //       "Category",
            //       "Contract Expiration",
            //       "Contract Start Date",
            //       "Contract End Date",
            //       "Employee",
            //       "Employee Manager",
            //       "Supplier Name",
            //       "Supplier ID",
            //       "Status",
            //       "Auto Renewal Term Length",
            //       "Diversity Supplier",
            //       "Program Code",
            //       "Revision Level",
            //       "Part Number",
            //       "Carton Size",
            //       "Last Modified Date",
            //       "File Name",
            //       "Total Liability",
            //       "Last Modified By",
            //       "Payment Terms",
            //       "Business Area",
            //       "Notice Period (# of Days)"
            //     ]
            //   },
            //   "Information Technology": {
            //     "searchGrid": [
            //       "File Name",
            //       "Department",
            //       "Region",
            //       "Country",
            //       "Location",
            //       "Category",
            //       "Description",
            //       "Contract Expiration",
            //       "Contract Start Date",
            //       "Contract End Date",
            //       "Owner Name",
            //       "Manager Name",
            //       "IT Leader",
            //       "Supplier ID",
            //       "Customer Name",
            //       "Status",
            //       "Auto Renewal Term Length",
            //       "Total Contract Value",
            //       "Last Modified By",
            //       "Last Modified Date"
            //     ],
            //     "favoriteGrid": [
            //       "File Name",
            //       "Department",
            //       "Business Area",
            //       "Document Types",
            //       "Portfolio",
            //       "Region",
            //       "Location",
            //       "Category",
            //       "Description",
            //       "Contract Expiration",
            //       "Contract Start Date",
            //       "Contract End Date",
            //       "Owner Name",
            //       "Manager Name",
            //       "IT Leader",
            //       "Supplier ID",
            //       "Customer Name",
            //       "Status",
            //       "Auto Renewal Term Length",
            //       "Total Contract Value",
            //       "Last Modified By"
            //     ],
            //     "favroiteGrid": [
            //       "Last Modified Date",
            //       "Department",
            //       "Business Area",
            //       "Document Types",
            //       "Portfolio",
            //       "Region",
            //       "Country",
            //       "Location",
            //       "Category",
            //       "Description",
            //       "Contract Expiration",
            //       "Contract Start Date",
            //       "Contract End Date",
            //       "Owner Name",
            //       "IT Leader",
            //       "Supplier Name",
            //       "Supplier ID",
            //       "Customer Name",
            //       "Status",
            //       "Auto Renewal Term Length",
            //       "Total Contract Value",
            //       "Last Modified By"
            //     ],
            //     "myDocumentGrid": [
            //       "File Name",
            //       "Upload Status",
            //       "Location",
            //       "Category",
            //       "Description",
            //       "Contract Expiration",
            //       "Contract Start Date",
            //       "Contract End Date",
            //       "Owner Name",
            //       "Manager Name",
            //       "IT Leader",
            //       "Customer Name",
            //       "Status",
            //       "Total Contract Value",
            //       "Last Modified By"
            //     ]
            //   }
            // },
            "createdBy": "superuser@softura.com",
            "favDocType": [
              3,
              5,
              4,
              2
            ],
            "defaultView": "",
            "fileTypeName": [
              "ALL"
            ],
            "recentAccessDocs": []
          },
          "created_by": "superuser@softura.com",
          "created_date_time": "2021-10-13T07:55:11.235003",
          "updated_by": "superuser@softura.com",
          "updated_date_time": "2022-08-18T12:45:02.781958"
        }
      }
    }; 
    if(userInfo && userInfo.rc == 0) {
      let userAccessResponse = userInfo?.data;

      if (userAccessResponse && Object.keys(userAccessResponse).length > 0) {
        let userPref = userAccessResponse?.userPreferences;
        const checkProp = userPref ? Object.keys(userPref).length : 0; //Object.hasOwnProperty.call(userPref, 'preferences');

        if (checkProp === 0) {
          userPref.preferences = {};
          userPref.preferences.recentAccessDocs = [];
          userPref.preferences.favDocType = [];
          userPref.preferences.defaultView = '';
          userAccessResponse.userPreferences = userPref??[];
          sessionStorage.setItem(sessionId, userAccessResponse);
        }

        res.json({
          rc: 0,
          message: 'Success',
          data: userAccessResponse
        });
      } else {
          res.status(401).json({
            rc: 8,
            message: 'Error - User Not Found',
            data: {}
          });
      }
    }
  } catch (error) {
    console.error('Exception', error);
    res.status(500).json(error.message);
  }

});

// router.get('/home/getUserAccess', async (req, res) => {
//   try {     
//       const userId = req.body.userId;
//       const userAccessResponse = await fetch.callGet(apiUrl + '/home/getUserDepartmentAccess?userId=' + userId);
//       res.json(userAccessResponse);
//   } catch (error) {
//       res.status(error.status).json(error.message);
//   }
// });

router.get('/home/getUserPreferences', async (req, res) => {
  try {
    const { userId } = req.query;
    //let prefResponse = await fetch.callGet(apiUrl + '/home/getUserPreferences?userId=' + userId);
    const prefResponse = {
      "rc": 0,
      "message": "Success",
      "data": {
        "preference_id": 6,
        "userid": 2334,
        "preferences": {
          "fileType": [],
          "createdBy": "bersysb@softura.com",
          "favDocType": [
            10,
            21,
            9
          ],
          "defaultView": "TILE",
          "recentAccessDocs": []
        },
        "created_by": "bersysb@softura.com",
        "created_date_time": "2021-11-30T02:59:08.877Z",
        "updated_by": "bersysb@softura.com",
        "updated_date_time": "2022-06-27T14:31:21.252Z"
      }
    };
    let userPref = prefResponse?.data ? prefResponse?.data : {};
    const checkProp = Object.keys(userPref).length; //Object.hasOwnProperty.call(userPref, 'preferences');

    if (checkProp === 0) {
      userPref.preferences = {};
      userPref.preferences.recentAccessDocs = [];
      userPref.preferences.favDocType = [];
      userPref.preferences.defaultView = '';
      userPref.preferences.fileType = [];
      prefResponse.data = userPref;
    }
    sessionStorage.setItem('userPreference', prefResponse.data);
    res.json(prefResponse);
  } catch (error) {
    logger.error('Error in Get user preference => ', error);
    console.error('Error in Get user preference => ', error);
    res.json({
      rc: 8,
      data: [],
      message: 'Error'
    });
  }
});

router.post('/home/insertOrUpdateUserPreferences', async (req, res) => {
  try {
    const resUserPref = await fetch.callPost(apiUrl + '/home/insertOrUpdateUserPreferences', req.body);
    res.json(resUserPref);
  } catch (error) {
    logger.error('Error in Insert or update user preference => ', error);
    console.error('Error in Insert or update user preference => ', error);
    res.json({
      rc: 8,
      data: [],
      message: 'Error'
    });
  }
});

router.post('/home/getDocumentType', async (req, res) => {
  try {
let keyWordList = req.body.keyWordList;
    const tileSearchData = {
      '1': [{
          "DocumentType": "Brand Management",
          "name": "Brand Management",
          "docTypeId": "405",
          "isFav": false,
          "hasChild" : true,
          "index" : 1,
          "keyWordList" : req.body.keyWordList
      },
      {
          "DocumentType": "DirectLinkCategory1",
          "name": "DirectLinkCategory1",
          "docTypeId": "401",
          "isFav": false,
          "hasChild" : true,
          "index" : 2,
          "keyWordList" : keyWordList
      },
      {
          "DocumentType": "Document Test Category_001",
          "name": "Document Test Category_001",
          "docTypeId": "333",
          "isFav": false,
          "hasChild" : true,
          "index" : 3,
          "keyWordList" : keyWordList
      },
      {
          "DocumentType": "Field Assembly Manual",
          "name": "Field Assembly Manual",
          "docTypeId": "7",
          "isFav": false,
          "hasChild" : true,
          "index" : 4,
          "keyWordList" : keyWordList
      }],
      '405': [{
    
          "ProductType": "Case Study",
          "name": "Case Study",
          "DocumentTypeValue": "Brand Management",
          "docTypeId": "407",
          "isFav": false,
          "hasChild" : true,
          "index" : 1,
          "keyWordList" : keyWordList
      },
      {
          "ProductType": "Manuals",
          "name": "Manuals",
          "DocumentTypeValue": "Brand Management",
          "docTypeId": "269",
          "isFav": false,
          "hasChild" : true,
          "index" : 2,
          "keyWordList" : keyWordList
      }],
      '401':[
          {
              "ProductType":"DirectURLCategory2",
              "name":"DirectURLCategory2",
              "DocumentTypeValue":"DirectLinkCategory1",
              "docTypeId":"402",
              "isFav":false,
              "hasChild" : true,
              "index" : 1,
              "keyWordList" : keyWordList
          }
      ],
      '269' : [{
        "ProductTypeValue":"269",
        "ProductType":"",
        "Model":"BM Manuals",
        "name":"BM Manuals",
        "docTypeId":"406",
        "isFav":false,
        "hasChild" : false,
        "index" : 1,
      }],
      '402':[
          {
              "ProductTypeValue":"402",
              "ProductType":"",
              "Model":"DirectURLNode",
              "name":"DirectURLNode",
              "docTypeId":"403",
              "isFav":false,
              "hasChild" : false,
              "index" : 1,
              "keyWordList" : keyWordList
          }
      ],
      '407': [{
              "ProductTypeValue":"407",
              "ProductType":"",
              "Model":"Global and Regional Meeting",
              "name":"Global and Regional Meeting",
              "docTypeId":"408",
              "isFav":false,
              "hasChild" : false,
              "index" : 1,
              "keyWordList" : keyWordList
          },
          {
              "ProductTypeValue":"407",
              "ProductType":"",
              "Model":"Regional Activity Update",
              "name":"Regional Activity Update",
              "docTypeId":"428",
              "isFav":false,
              "hasChild" : false,
              "index" : 2,
              "keyWordList" : keyWordList
          }]
    }    

    //const docTypes = await fetch.callPost(apiUrl + '/home/getDocumentType', req.body);
    const docTypes = {"rc":0,'data':[]};
    docTypes.data = tileSearchData[req.body.docTypeId];
    res.json(docTypes);
  } catch (error) {
    logger.error('Error in Get Document Types => ', error);
    console.error('Error in Get Document Types => ', error);
    res.json({
      rc: 8,
      data: [],
      message: 'Error'
    });
  }
});

router.get('/home/getFileTypes', async (req, res) => {
  try {
    //const resFileType = await fetch.callGet(apiUrl + '/home/getFileTypes');
    const resFileType = {
      "rc": 0,
      "message": "Success",
      "data": [
        {
          "file_type_id": 1,
          "attribute_name": "DOCX",
          "isactive": true,
          "created_by": "poomarim@softura.com",
          "created_date_time": "2021-08-16T19:56:58.758Z",
          "updated_by": "poomarim@softura.com",
          "updated_date_time": "2021-08-16T19:56:58.758Z"
        },
        {
          "file_type_id": 2,
          "attribute_name": "PDF",
          "isactive": true,
          "created_by": "poomarim@softura.com",
          "created_date_time": "2021-08-16T19:56:58.758Z",
          "updated_by": "poomarim@softura.com",
          "updated_date_time": "2021-08-16T19:56:58.758Z"
        },
        {
          "file_type_id": 3,
          "attribute_name": "PPT",
          "isactive": true,
          "created_by": "poomarim@softura.com",
          "created_date_time": "2021-08-16T19:56:58.758Z",
          "updated_by": "poomarim@softura.com",
          "updated_date_time": "2021-08-16T19:56:58.758Z"
        },
        {
          "file_type_id": 4,
          "attribute_name": "XLSX",
          "isactive": true,
          "created_by": "poomarim@softura.com",
          "created_date_time": "2021-08-16T19:56:58.758Z",
          "updated_by": "poomarim@softura.com",
          "updated_date_time": "2021-08-16T19:56:58.758Z"
        },
        {
          "file_type_id": 5,
          "attribute_name": "TXT",
          "isactive": true,
          "created_by": "poomarim@softura.com",
          "created_date_time": "2021-08-16T19:56:58.758Z",
          "updated_by": "poomarim@softura.com",
          "updated_date_time": "2021-08-16T19:56:58.758Z"
        },
        {
          "file_type_id": 6,
          "attribute_name": "XLS",
          "isactive": true,
          "created_by": "poomarim@softura.com",
          "created_date_time": "2021-08-16T19:56:58.758Z",
          "updated_by": "poomarim@softura.com",
          "updated_date_time": "2021-08-16T19:56:58.758Z"
        },
        {
          "file_type_id": 7,
          "attribute_name": "JPG",
          "isactive": true,
          "created_by": "poomarim@softura.com",
          "created_date_time": "2021-08-16T19:56:58.758Z",
          "updated_by": "poomarim@softura.com",
          "updated_date_time": "2021-08-16T19:56:58.758Z"
        },
        {
          "file_type_id": 8,
          "attribute_name": "PNG",
          "isactive": true,
          "created_by": "poomarim@softura.com",
          "created_date_time": "2021-08-16T19:56:58.758Z",
          "updated_by": "poomarim@softura.com",
          "updated_date_time": "2021-08-16T19:56:58.758Z"
        },
        {
          "file_type_id": 9,
          "attribute_name": "GIF",
          "isactive": true,
          "created_by": "poomarim@softura.com",
          "created_date_time": "2021-08-16T19:56:58.758Z",
          "updated_by": "poomarim@softura.com",
          "updated_date_time": "2021-08-16T19:56:58.758Z"
        },
        {
          "file_type_id": 10,
          "attribute_name": "JPEG",
          "isactive": true,
          "created_by": "poomarim@softura.com",
          "created_date_time": "2021-08-16T19:56:58.758Z",
          "updated_by": "poomarim@softura.com",
          "updated_date_time": "2021-08-16T19:56:58.758Z"
        },
        {
          "file_type_id": 11,
          "attribute_name": "FOLDER",
          "isactive": true,
          "created_by": "poomarim@softura.com",
          "created_date_time": "2021-08-16T19:56:58.758Z",
          "updated_by": "poomarim@softura.com",
          "updated_date_time": "2021-08-16T19:56:58.758Z"
        },
        {
          "file_type_id": 12,
          "attribute_name": "TIF",
          "isactive": true,
          "created_by": "poomarim@softura.com",
          "created_date_time": "2021-08-16T19:56:58.758Z",
          "updated_by": "poomarim@softura.com",
          "updated_date_time": "2021-08-16T19:56:58.758Z"
        },
        {
          "file_type_id": 13,
          "attribute_name": "ZIP",
          "isactive": true,
          "created_by": "poomarim@softura.com",
          "created_date_time": "2021-09-28T14:30:25.005Z",
          "updated_by": "poomarim@softura.com",
          "updated_date_time": "2021-09-28T14:30:25.005Z"
        },
        {
          "file_type_id": 14,
          "attribute_name": "STP",
          "isactive": true,
          "created_by": "Poomari.Mariappan@cooperstandard.com",
          "created_date_time": "2021-10-20T14:52:44.051Z",
          "updated_by": "Poomari.Mariappan@cooperstandard.com",
          "updated_date_time": "2021-10-20T14:52:44.051Z"
        },
        {
          "file_type_id": 15,
          "attribute_name": "MSG",
          "isactive": true,
          "created_by": "Poomari.Mariappan@cooperstandard.com",
          "created_date_time": "2021-10-20T14:53:38.784Z",
          "updated_by": "Poomari.Mariappan@cooperstandard.com",
          "updated_date_time": "2021-10-20T14:53:38.784Z"
        }
      ]
    };
    res.json(resFileType);
  } catch (error) {
    logger.error('Error in Get File types => ', error);
    console.error('Error in Get File types => ', error);
    res.json({
      rc: 8,
      data: [],
      message: 'Error'
    });
  }
});

module.exports = router;
