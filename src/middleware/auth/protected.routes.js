module.exports.protectedRoutes = [
  //user routes

  {
    path: "/user/update/:id",
    methods: ["PUT"],
  },
  {
    path: "/user/delete/:id",
    methods: ["DELETE"],
  },
  {
    path: "/user/get/:id",
    methods: ["GET"],
  },
  {
    path: "/user/getall",
    methods: ["GET"],
  },
];
