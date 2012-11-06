// Generated by CoffeeScript 1.3.3

describe("Hoodie.ShareInstance", function() {
  beforeEach(function() {
    this.hoodie = new Mocks.Hoodie;
    this.share = new Hoodie.ShareInstance(this.hoodie, {
      id: 'id123'
    });
    spyOn(this.hoodie, "resolveWith").andCallThrough();
    this.updateDefer = this.hoodie.defer();
    return spyOn(this.hoodie.share, "update").andReturn(this.updateDefer.promise());
  });
  describe("constructor", function() {
    it("should set id from options.id", function() {
      var share;
      share = new Hoodie.ShareInstance(this.hoodie, {
        id: 'id123'
      });
      return expect(share.id).toBe('id123');
    });
    it("shoudl set name from id", function() {
      var share;
      share = new Hoodie.ShareInstance(this.hoodie, {
        id: 'id123'
      });
      return expect(share.name).toBe('share/id123');
    });
    it("should generate an id if options.id wasn't passed", function() {
      var share;
      share = new Hoodie.ShareInstance(this.hoodie);
      return expect(share.id).toBe('uuid');
    });
    it("should set options", function() {
      var share;
      share = new Hoodie.ShareInstance(this.hoodie, {
        funky: 'fresh'
      });
      return expect(share.funky).toBe('fresh');
    });
    return it("should default access to false", function() {
      var share;
      share = new Hoodie.ShareInstance(this.hoodie);
      return expect(share.access).toBe(false);
    });
  });
  describe("#grantReadAccess(users)", function() {
    var access, _i, _len, _ref;
    _when("share.access is false", function() {
      beforeEach(function() {
        return this.share.access = false;
      });
      _and("no users passed", function() {
        beforeEach(function() {
          return this.promise = this.share.grantReadAccess();
        });
        it("should set access to true", function() {
          return expect(this.share.access).toBe(true);
        });
        it("should update share", function() {
          return expect(this.hoodie.share.update).wasCalledWith('id123', {
            access: true
          });
        });
        return it("should return a promise from share.update", function() {
          this.updateDefer.resolve('funk');
          return expect(this.promise).toBeResolvedWith('funk');
        });
      });
      return _and("user 'joe@example.com' passed", function() {
        beforeEach(function() {
          return this.share.grantReadAccess('joe@example.com');
        });
        it("should set access to ['joe@example.com']", function() {
          return expect(this.share.access.join()).toBe('joe@example.com');
        });
        return it("should update share", function() {
          return expect(this.hoodie.share.update).wasCalledWith('id123', {
            access: ['joe@example.com']
          });
        });
      });
    });
    _when("share.access is {read: false}", function() {
      beforeEach(function() {
        return this.share.access = {
          read: false
        };
      });
      _and("no users passed", function() {
        beforeEach(function() {
          return this.promise = this.share.grantReadAccess();
        });
        it("should set access to true", function() {
          return expect(this.share.access.read).toBe(true);
        });
        return it("should update share", function() {
          return expect(this.hoodie.share.update).wasCalledWith('id123', {
            access: {
              read: true
            }
          });
        });
      });
      return _and("user 'joe@example.com' passed", function() {
        beforeEach(function() {
          return this.share.grantReadAccess('joe@example.com');
        });
        it("should set access to ['joe@example.com']", function() {
          return expect(this.share.access.read.join()).toBe('joe@example.com');
        });
        return it("should update share", function() {
          return expect(this.hoodie.share.update).wasCalledWith('id123', {
            access: {
              read: ['joe@example.com']
            }
          });
        });
      });
    });
    _ref = [
      true, {
        read: true
      }
    ];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      access = _ref[_i];
      _when("share.access is " + (JSON.stringify(access)), function() {
        beforeEach(function() {
          this.share.access = access;
          return this.promise = this.share.grantReadAccess();
        });
        it("should not call share.update", function() {
          return expect(this.hoodie.share.update).wasNotCalled();
        });
        return it("should return a resolved promise", function() {
          expect(this.hoodie.resolveWith).wasCalledWith(this.share);
          return expect(this.promise).toBe('resolved');
        });
      });
    }
    return _when("share.access is ['joe@example.com']", function() {
      beforeEach(function() {
        return this.share.access = ['joe@example.com'];
      });
      _and("no users passed", function() {
        beforeEach(function() {
          return this.promise = this.share.grantReadAccess();
        });
        return it("should set access to true", function() {
          return expect(this.share.access).toBe(true);
        });
      });
      _and("user 'joe@example.com' passed", function() {
        beforeEach(function() {
          return this.share.grantReadAccess('joe@example.com');
        });
        return it("should set access to joe@example.com", function() {
          return expect(this.share.access.join()).toBe('joe@example.com');
        });
      });
      return _and("user 'lisa@example.com' passed", function() {
        beforeEach(function() {
          return this.share.grantReadAccess('lisa@example.com');
        });
        return it("should set access to true", function() {
          return expect(this.share.access.join(',')).toBe('joe@example.com,lisa@example.com');
        });
      });
    });
  });
  describe("#revokeReadAccess(users)", function() {
    _when("share.access is true", function() {
      beforeEach(function() {
        return this.share.access = true;
      });
      _and("no users passed", function() {
        beforeEach(function() {
          return this.promise = this.share.revokeReadAccess();
        });
        it("should set access to false", function() {
          return expect(this.share.access).toBe(false);
        });
        return it("should update share", function() {
          return expect(this.hoodie.share.update).wasCalledWith('id123', {
            access: false
          });
        });
      });
      return _and("user 'joe@example.com' passed", function() {
        beforeEach(function() {
          return this.promise = this.share.revokeReadAccess('joe@example.com');
        });
        it("should not change access", function() {
          return expect(this.share.access).toBe(true);
        });
        it("should not update share", function() {
          return expect(this.hoodie.share.update).wasNotCalled();
        });
        return it("should return a rejected promise", function() {
          return expect(this.promise).toBe('rejected');
        });
      });
    });
    _when("share.access is {read: true, write: ['joe@example.com']}", function() {
      beforeEach(function() {
        return this.share.access = {
          read: true,
          write: ['joe@example.com']
        };
      });
      return _and("user 'joe@example.com' passed", function() {
        beforeEach(function() {
          return this.promise = this.share.revokeReadAccess('joe@example.com');
        });
        it("should set access to true", function() {
          return expect(this.share.access).toBe(true);
        });
        it("should update share", function() {
          return expect(this.hoodie.share.update).wasCalledWith('id123', {
            access: true
          });
        });
        return it("should return a rejected promise", function() {
          return expect(this.promise).toBe('rejected');
        });
      });
    });
    _when("share.access is false", function() {
      beforeEach(function() {
        this.share.access = false;
        return this.promise = this.share.revokeReadAccess();
      });
      it("should not call share.update", function() {
        return expect(this.hoodie.share.update).wasNotCalled();
      });
      return it("should return a resolved promise", function() {
        expect(this.hoodie.resolveWith).wasCalledWith(this.share);
        return expect(this.promise).toBe('resolved');
      });
    });
    return _when("share.access is ['joe@example.com']", function() {
      beforeEach(function() {
        return this.share.access = ['joe@example.com'];
      });
      _and("no users passed", function() {
        beforeEach(function() {
          return this.promise = this.share.revokeReadAccess();
        });
        return it("should set access to false", function() {
          return expect(this.share.access).toBe(false);
        });
      });
      _and("user 'joe@example.com' passed", function() {
        beforeEach(function() {
          return this.share.revokeReadAccess('joe@example.com');
        });
        return it("should set access to false", function() {
          return expect(this.share.access).toBe(false);
        });
      });
      return _and("user 'lisa@example.com' passed", function() {
        beforeEach(function() {
          return this.share.revokeReadAccess('lisa@example.com');
        });
        it("should not change access", function() {
          return expect(this.share.access.join(',')).toBe('joe@example.com');
        });
        return it("should not update in store", function() {
          return expect(this.hoodie.share.update).wasNotCalled();
        });
      });
    });
  });
  describe("#grantWriteAccess(users)", function() {
    _when("share.access is false", function() {
      beforeEach(function() {
        return this.share.access = false;
      });
      _and("no users passed", function() {
        beforeEach(function() {
          return this.promise = this.share.grantWriteAccess();
        });
        it("should set access to {read: true, write: true}", function() {
          expect(this.share.access.read).toBe(true);
          return expect(this.share.access.write).toBe(true);
        });
        return it("should update share", function() {
          return expect(this.hoodie.share.update).wasCalledWith('id123', {
            access: {
              read: true,
              write: true
            }
          });
        });
      });
      return _and("user 'joe@example.com' passed", function() {
        beforeEach(function() {
          return this.share.grantWriteAccess('joe@example.com');
        });
        it("should set access to {read: ['joe@example.com'], write: ['joe@example.com']}", function() {
          expect(this.share.access.read.join()).toBe('joe@example.com');
          return expect(this.share.access.write.join()).toBe('joe@example.com');
        });
        return it("should update share", function() {
          return expect(this.hoodie.share.update).wasCalledWith('id123', {
            access: {
              read: ['joe@example.com'],
              write: ['joe@example.com']
            }
          });
        });
      });
    });
    _when("share.access is {read: true, write: true}", function() {
      beforeEach(function() {
        this.share.access = {
          read: true,
          write: true
        };
        return this.promise = this.share.grantWriteAccess();
      });
      it("should not call share.update", function() {
        return expect(this.hoodie.share.update).wasNotCalled();
      });
      return it("should return a resolved promise", function() {
        expect(this.hoodie.resolveWith).wasCalledWith(this.share);
        return expect(this.promise).toBe('resolved');
      });
    });
    return _when("share.access is ['joe@example.com']", function() {
      beforeEach(function() {
        return this.share.access = ['joe@example.com'];
      });
      _and("no users passed", function() {
        beforeEach(function() {
          return this.promise = this.share.grantWriteAccess();
        });
        return it("should set access to {read: true, write: true}", function() {
          expect(this.share.access.read).toBe(true);
          return expect(this.share.access.write).toBe(true);
        });
      });
      _and("user 'joe@example.com' passed", function() {
        beforeEach(function() {
          return this.share.grantWriteAccess('joe@example.com');
        });
        return it("should set access to {read: ['joe@example.com'], write: ['joe@example.com']}", function() {
          expect(this.share.access.read.join()).toBe('joe@example.com');
          return expect(this.share.access.write.join()).toBe('joe@example.com');
        });
      });
      return _and("user 'lisa@example.com' passed", function() {
        beforeEach(function() {
          return this.share.grantWriteAccess('lisa@example.com');
        });
        return it("should set access to {read: ['joe@example.com', 'lisa@example.com'], write: ['joe@example.com']}", function() {
          expect(this.share.access.read.join(',')).toBe('joe@example.com,lisa@example.com');
          return expect(this.share.access.write.join(',')).toBe('lisa@example.com');
        });
      });
    });
  });
  return describe("#revokeWriteAccess(users)", function() {
    _when("share.access is true", function() {
      beforeEach(function() {
        return this.share.access = true;
      });
      return _and("no users passed", function() {
        beforeEach(function() {
          return this.promise = this.share.revokeWriteAccess();
        });
        it("should not change access", function() {
          return expect(this.share.access).toBe(true);
        });
        return it("should not update share", function() {
          return expect(this.hoodie.share.update).wasNotCalled();
        });
      });
    });
    _when("share.access is {read: true, write: true}", function() {
      beforeEach(function() {
        return this.share.access = {
          read: true,
          write: true
        };
      });
      _and("no users passed", function() {
        beforeEach(function() {
          return this.promise = this.share.revokeWriteAccess();
        });
        it("should change access to true", function() {
          return expect(this.share.access).toBe(true);
        });
        return it("should not update share", function() {
          return expect(this.hoodie.share.update).wasCalledWith('id123', {
            access: true
          });
        });
      });
      return _and("user 'joe@example.com' passed", function() {
        beforeEach(function() {
          return this.promise = this.share.revokeWriteAccess('joe@example.com');
        });
        it("should not change access", function() {
          expect(this.share.access.read).toBe(true);
          return expect(this.share.access.write).toBe(true);
        });
        it("should not update share", function() {
          return expect(this.hoodie.share.update).wasNotCalled();
        });
        return it("should return a rejected promise", function() {
          return expect(this.promise).toBe('rejected');
        });
      });
    });
    _when("share.access is {read: true, write: ['joe@example.com']}", function() {
      beforeEach(function() {
        return this.share.access = {
          read: true,
          write: ['joe@example.com']
        };
      });
      return _and("user 'joe@example.com' passed", function() {
        beforeEach(function() {
          return this.promise = this.share.revokeWriteAccess('joe@example.com');
        });
        it("should set access to true", function() {
          return expect(this.share.access).toBe(true);
        });
        return it("should update share", function() {
          return expect(this.hoodie.share.update).wasCalledWith('id123', {
            access: true
          });
        });
      });
    });
    _when("share.access is false", function() {
      beforeEach(function() {
        this.share.access = false;
        return this.promise = this.share.revokeWriteAccess();
      });
      it("should not call share.update", function() {
        return expect(this.hoodie.share.update).wasNotCalled();
      });
      return it("should return a resolved promise", function() {
        expect(this.hoodie.resolveWith).wasCalledWith(this.share);
        return expect(this.promise).toBe('resolved');
      });
    });
    return _when("share.access is ['joe@example.com']", function() {
      beforeEach(function() {
        return this.share.access = ['joe@example.com'];
      });
      _and("no users passed", function() {
        beforeEach(function() {
          return this.promise = this.share.revokeWriteAccess();
        });
        return it("should not change access", function() {
          return expect(this.share.access.join()).toBe('joe@example.com');
        });
      });
      _and("user 'joe@example.com' passed", function() {
        beforeEach(function() {
          return this.share.revokeWriteAccess('joe@example.com');
        });
        return it("should not change access", function() {
          return expect(this.share.access.join()).toBe('joe@example.com');
        });
      });
      return _and("user 'lisa@example.com' passed", function() {
        beforeEach(function() {
          return this.share.revokeWriteAccess('lisa@example.com');
        });
        it("should not change access", function() {
          return expect(this.share.access.join(',')).toBe('joe@example.com');
        });
        return it("should not update in store", function() {
          return expect(this.hoodie.share.update).wasNotCalled();
        });
      });
    });
  });
});