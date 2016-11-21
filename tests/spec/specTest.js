describe("IDValidator test", function(){
    var testId = "371001198010082394";
    var fakeId = "345955198706122245";
    var fifteenId = "431389760616601";

    var Validator = new IDValidator();
    var makeID = Validator.makeID();

    it( fakeId+" should be a FAKE ID", function() {
        expect( Validator.isValid(fakeId) ).toBe(false);
    });
    it( testId+" should be a REAL ID", function() {
        expect( Validator.isValid(testId) ).toBe(true);
    });
    it( testId+" should be a MALE ID", function() {
        expect( Validator.getInfo(testId).sex ).toBe(1);
    });
    it( testId+" birth is 1980-10-08", function() {
        expect( Validator.getInfo(testId).birth ).toEqual('1980-10-08');
    });
    it( fifteenId+" should be a 15 ID", function() {
        expect( Validator.getInfo(fifteenId).length ).toBe(15);
    });
    it( "the maked ID "+makeID+" should be a REAL ID", function() {
        expect( Validator.isValid(makeID) ).toBe(true);
    });
    it( " limited 18 ID", function() {
        expect( Validator.isValid(fifteenId) ).toBe(true);
        expect( Validator.isValid(fifteenId, 18) ).toBe(false);
        expect( typeof Validator.getInfo(fifteenId) ).toBe("object");
        expect( Validator.getInfo(fifteenId, 18) ).toBe(false);
    });
});
