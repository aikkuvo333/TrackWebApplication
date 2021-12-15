describe("login", function(){ // server pitää olla päällä testejä varten

  beforeAll(function(){
    test.addToUsers("test", "test", "male", "unactive");
    test.addToUsers("test2", "test2", "female", "active");
  }) ;

  it("Should be able to create user", function (){
    let before = test.size();
    let success = test.createUser("test3", "test3", "male", "active");
    expect(test.size()).toBe(before +1);
    expect(success).toBe(true);
  });

  it("Should be able to sign in", function(){
    expect(test.signIn("test2", "test2", "female", "active")).toBe(true);
  });

  it("Should not be able to sign in with wrong info", function(){
    expect(test.signIn("test2", "test", "female", "active")).toBe(false);

  });

  it("Should be able to recognize if username already exists ", function (){
    let before = test.size();
    let success = test.createUser("test", "test3", "male", "active");
    expect(test.size()).toBe(before);
    expect(success).toBe(false);
  });
  it("Should be able to recognize empty fields", function(){

    let before = test.size();
    let success = test.createUser("", "test6", "female", "");
    expect(test.size()).toBe(before);
    expect(success).toBe(false);
  });

  it("Should be able to pass validation", function(){

    let before = test.size();
    let success = test.createUser("te13", "testtesttest", "female", "active");
    expect(test.size()).toBe(before + 1);
    expect(success).toBe(true);
  });

});