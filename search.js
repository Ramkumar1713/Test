const router = require('express').Router();
const {envConfig} =require('../../envConfig');
const fetch = require('../../lib/apiHelper');
const auth = require('../../auth');

router.post('/search/getDocumentSearchResults', async (req, res) => {
  try {
    let searchStringList = req.body.searchString;
    const reqBody ={
      "categoryDetails1": searchStringList?.[0]?.trim() ?? '',
      "categoryDetails2": searchStringList?.[1]?.trim() ?? '',
      "categoryDetails3": searchStringList?.[2]?.trim() ?? '',
      "userID": 2334,
      "pageNumber": 1,
      "rowsOfPage": 10,
      "sortColumn": "ID",
      "sortOrder": "desc",
      "IsSearch":1,
      "IsFilter":0,
      "IsExport":0,
      "Status":"",
      "IsKeywordSearch" : req.body.fullWordMatch === true ? 1 : 0
    };

    const searchResponseApi = await fetch.callPost(envConfig.API_URL + '/api/v1/Document/GetDocuments', reqBody);
    let category1 = [];
    let productType = [];
    let modelType = [];
    let status = [];
    let filters = {"Category 1" : [], "Product Type" : [], "Model Type" : [], "Status" : []};
    let totalSize = 0;
    if(searchResponseApi?.length > 0){
      JSON.parse(searchResponseApi[0]?.filters).forEach((x)=> {
        category1.push(x['category1']);
        productType.push(x['category2']?? x['productType']);
        modelType.push(x['category3']?? x['model']);
        status.push(x['status']);
    });
  
    filters['Category 1'] = [...new Set(category1)];
    filters['Product Type'] =  [...new Set(productType)];
    filters['Model Type'] = [...new Set(modelType)];
    filters['Status'] = [...new Set(status)];

    totalSize = JSON.parse(searchResponseApi[0]?.filters)?.[0]?.totalcount;
    }
   
    const searchResponse = {
      "rc": 0,
      "message": "Success",
      "data": {
        "resultSet": searchResponseApi,
        "totalSize": totalSize,
        "filters": filters
      } 
    };
    res.json(searchResponse);
  } catch (error) {
    console.info("Error in getDocumentSearchResults : ",error)
    res.json({
      rc: 8,
      data: [],
      message: 'Error'
    });
  }
});

router.post('/search/getDocumentSearchFilter', async (req, res) => {
  try {
    //const searchResponse = await fetch.callPost(envConfig.API_URL + '/search/getDocumentSearchFilter', req.body);
    let reqBody = req.body;

    const reqBodyPayLoad ={
      // "categoryDetails1": reqBody?.filterOptions?.['Category 1']?.join(',') ?? '',
      // "categoryDetails2": reqBody?.filterOptions?.['Product Type']?.join(',') ?? '',
      // "categoryDetails3": reqBody?.filterOptions?.['Model Type']?.join(',') ?? '',
      "categoryDetails1": reqBody?.filterOptions?.['Category 1']?.join(',')  !== '' && reqBody?.filterOptions?.['Category 1']?.join(',') ? reqBody?.filterOptions?.['Category 1']?.join(',') : reqBody?.filterOptions?.initialfilters?.[0],
      "categoryDetails2": reqBody?.filterOptions?.['Product Type']?.join(',') !== '' && reqBody?.filterOptions?.['Product Type']?.join(',') ? reqBody?.filterOptions?.['Product Type']?.join(',') : reqBody?.filterOptions?.initialfilters?.[1],
      "categoryDetails3": reqBody?.filterOptions?.['Model Type']?.join(',') !== '' && reqBody?.filterOptions?.['Model Type']?.join(',') ? reqBody?.filterOptions?.['Model Type']?.join(',') : reqBody?.filterOptions?.initialfilters?.[2],
      "userID": 2334,
      "pageNumber": reqBody?.pagination?.current ?? 1,
      "rowsOfPage": reqBody?.pagination?.pageSize ?? 10,
      "sortColumn": reqBody?.sortField ?? 'ID',
      "sortOrder": reqBody?.sortOrder === 'ascend' ? 'asc' : 'desc',
      "IsSearch":0,
      "IsFilter":1,
      "IsKeywordSearch" : 0,
      "IsExport": reqBody?.exportExcel ? 1 : 0,
      "Status": reqBody?.filterOptions?.['Status']?.join(',') !== '' && reqBody?.filterOptions?.['Status']?.join(',') ? reqBody?.filterOptions?.['Status']?.join(',') : 'Active'
    };
    let totalSize = 0;
    let searchResponseApi = [];

    if(reqBody?.isContentSearch){

      const headers = {
        Authorization: `Bearer ${envConfig.TOKEN}` 
      };

      let response = await fetch.callGet(`${envConfig.CONTENT_SEARCH_URL}/${reqBodyPayLoad?.categoryDetails1}`,headers);
      searchResponseApi = response?.data;

      if(searchResponseApi?.length > 0){
        totalSize = searchResponseApi?.length;
      }
    } else {
      searchResponseApi = await fetch.callPost(envConfig.API_URL + '/api/v1/Document/GetDocuments', reqBodyPayLoad);

      if(searchResponseApi?.length > 0){
        totalSize = JSON.parse(searchResponseApi?.[0]?.filters)?.[0]?.totalcount
      }
    }
    
    const searchResponse = { 
      "rc": 0,
      "message": "Success",
      "data":  searchResponseApi,
      "totalSize" : totalSize
    }
    res.json(searchResponse);
  } catch (error) {
    console.info("Error in getDocumentSearchFilter : ",error)
    res.json({
      rc: 8,
      data: [],
      message: 'Error'
    });
  }
})

// router.get('/search/getDocumentFilterResults', async (req, res) => {
//   try {

//     const filters = {
//       'Department': ['Purchasing'],
//       'Business Area': ['Indirect Purchasing', 'Direct Purchasing'],
//       'Region': ['North America', 'Europe', 'Asia Pacific', 'Global', 'South America'],
//       'Location': ['Aguascalientes', 'Aguascalientes (Warehouse)', 'Aguascalientes 2', 'Amsterdam (Amstelveen)', 'Atibaia - South America Headquarters'],
//       'Product Line': ['Fluid Transfer Systems', 'Fuel and Brake', 'Sealing', 'ISG', 'Corporate', 'N/A - Indirect'],
//       'Commodity': ['Carrier - Aluminum, solid, stamped, lanced', 'Carrier - Carbon Steel solid, stamped, lanced', 'Carrier - Stainless Steel solid, stamped, lanced', 'Carrier - Wire', 'Casting - Aluminum Die - Machined'],
//       'Commodity Family': ['Carrier', 'Castings', 'Clamps', 'Decorative Components / Trim Parts', 'Fasteners - Metal'],
//       'Category': ['Plastic', 'Metal', 'Rubber', 'SME'],
//       'Supplier Name': ['Softura'],
//     }
//     res.json({
//       rc: 0,
//       data: filters,
//       message: 'Success'
//     });
//   } catch (error) {
//     console.error('Error in Get Filter => ', error);
//     res.json({
//       rc: 7,
//       data: [],
//       message: 'Error'
//     });
//   }
// });

router.post('/search/insertFileLink', auth.protected, async (req, res) => {
  try {
    const reqBody = req.body;
    const searchResponse = await fetch.callPost(envConfig.API_URL + '/search/insertFileLink', reqBody);
    res.json(envConfig.APP_URL + searchResponse.data);
  } catch (ex) {
    console.error('Error in insertFileLink => ', ex);
    res.json({
      rc: 8,
      data: [],
      message: 'Error'
    });
  }
});

router.post('/search/updateFileLink', async (req, res) => {
  try {
    const reqBody = req.body;
    const searchResponse = await fetch.callPost(envConfig.API_URL + '/search/updateFileLink', reqBody?.fileLinkInfo);
    res.json(searchResponse);
  } catch (ex) {
    console.error('Error in updateFileLink => ', ex);
    res.json({
      rc: 8,
      data: [],
      message: 'Error'
    });
  }

});

router.post('/search/deleteRecordList', async (req, res) => {
  try {
    const response = await fetch.callPost(envConfig.API_URL + '/search/deleteRecordList', req.body);
    res.json(response);
  } catch (error) {
    res.json({
      rc: 8,
      data: [],
      message: 'Error'
    });
  }
})

module.exports = router;
