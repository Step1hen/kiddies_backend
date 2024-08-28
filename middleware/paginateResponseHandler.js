const asyncHandler = require("express-async-handler");

const paginatedResults = (model) => {
  return asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1; // If page not defined set default to 1
    const limit = parseInt(req.query.limit) || 12; // If limit not defined set default to 12

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Set data for final result in "pagination" object
    const currentPage = page;
    const nextPage = page + 1 || null;
    const prevPage = page - 1 || null;

    const results = {};

    const totalCount = await model.countDocuments().exec(); // Get total items in the mongo DB

    // Set next page parameters {page number, limit} before adding to result object
    if (endIndex < totalCount) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    // Set previous page parameters {page number, limit} before adding to result object
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    try {
      // Execute query by limit starting from the current index
      results.response = await model
        .find()
        .limit(limit)
        .skip(startIndex)
        .exec();

      // Calculate total pages in rounded up
      const totalPages = Math.ceil(totalCount / limit);
      const totalCurrentRecords = results.response.length;

      res.paginatedResults = {
        ...results,
        pagination: {
          total_records: totalCount,
          total_current_records: totalCurrentRecords,
          current_page: currentPage,
          total_pages: totalPages,
          next_page: nextPage,
          prev_page: prevPage,
        },
      };
      next();
    } catch (err) {
      res.status(500);
      throw new Error("Internal Server Error! Something went wrong.", err);
    }
  });
};

module.exports = paginatedResults;
