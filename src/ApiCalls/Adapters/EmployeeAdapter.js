const employeesAdapter = employees => {
  return employees.map(employee => {
    employee.oid = employee.OID;
    employee.firstName = employee.firstname;
    employee.lastName = employee.lastname;
    employee.middleI = employee.middlei;
    employee.ssn = employee.ssn;
    employee.employeeNumber = employee.employeenumber;
    employee.address1 = employee.address1;
    employee.address2 = employee.address2;
    employee.city = employee.city;
    employee.state = employee.state;
    employee.zip = employee.zip;
    employee.homePhone = employee.homephone;
    employee.mobilePhone = employee.mobilephone;
    employee.workPhone = employee.workphone;
    employee.pager = employee.pager;
    employee.fax = employee.fax;
    employee.otherPhone = employee.otherphone;
    employee.contact = employee.contact;
    employee.startDate = employee.startdate;
    employee.availableDate = employee.availabledate;
    employee.hourlyCost = employee.hourlycost;
    employee.inactive = employee.inactive;
    employee.note = employee.note;
    employee.passwrd = employee.passwrd;
    employee.userType = employee.usertype;
    employee.username = employee.username;

    delete employee.OID;
    delete employee.firstname;
    delete employee.lastname;
    delete employee.middlei;
    delete employee.employeenumber;
    delete employee.homephone;
    delete employee.mobilephone;
    delete employee.workphone;
    delete employee.otherphone;
    delete employee.startdate;
    delete employee.availabledate;
    delete employee.hourlycost;
    delete employee.passwrd;
    delete employee.usertype;

    return employee;
  });
};

export default employeesAdapter;
