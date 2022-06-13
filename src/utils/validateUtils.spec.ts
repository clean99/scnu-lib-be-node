import {
  validateCollege,
  validateDateAfter,
  validateEmail,
  validatePassword,
  validatePhone,
} from './validateUtils';

describe('validateUtils', () => {
  describe('validateEmail', () => {
    describe('when given a correct email', () => {
      let result: boolean;

      beforeEach(() => {
        result = validateEmail('123456@gmail.com');
      });

      it('should return true', () => {
        expect(result).toEqual(true);
      });
    });

    describe('when given a wrong email', () => {
      let result: boolean;

      beforeEach(() => {
        result = validateEmail('123456gmail.com');
      });

      it('should return false', () => {
        expect(result).toEqual(false);
      });
    });
  });

  describe('validateCollege', () => {
    describe('when given a correct college', () => {
      let result: boolean;

      beforeEach(() => {
        result = validateCollege('00:00');
      });

      it('should return true', () => {
        expect(result).toEqual(true);
      });
    });

    describe('when given a wrong college', () => {
      let result: boolean;

      beforeEach(() => {
        result = validateCollege('1:31');
      });

      it('should return false', () => {
        expect(result).toEqual(false);
      });
    });
  });

  describe('validatePhone', () => {
    describe('when given a correct phone', () => {
      let result: boolean;

      beforeEach(() => {
        result = validatePhone('12345678910');
      });

      it('should return true', () => {
        expect(result).toEqual(true);
      });
    });

    describe('when given a wrong phone', () => {
      let result: boolean;

      beforeEach(() => {
        result = validatePhone('123456789');
      });

      it('should return false', () => {
        expect(result).toEqual(false);
      });
    });
  });

  describe('validatePassword', () => {
    describe('when given a correct password', () => {
      let result: boolean;

      beforeEach(() => {
        result = validatePassword('Abc123456*');
      });

      it('should return true', () => {
        expect(result).toEqual(true);
      });
    });

    describe('when given a wrong password', () => {
      let result: boolean;

      beforeEach(() => {
        result = validatePassword('123456789');
      });

      it('should return false', () => {
        expect(result).toEqual(false);
      });
    });
  });

  describe('validateDateAfter', () => {
    describe('when given a date after another date', () => {
      let result: boolean;

      beforeEach(() => {
        result = validateDateAfter(
          '2022-10-12T00:00:00Z',
          '2022-10-10T00:00:00Z',
        );
      });

      it('should return true', () => {
        expect(result).toEqual(true);
      });
    });

    describe('when given a wrong date', () => {
      let result: boolean;

      beforeEach(() => {
        result = validateDateAfter('wrongdate', 'wrongdate');
      });

      it('should return false', () => {
        expect(result).toEqual(false);
      });
    });

    describe('when given a date before another date', () => {
      let result: boolean;

      beforeEach(() => {
        result = validateDateAfter(
          '2022-10-12T00:00:00Z',
          '2022-11-12T00:00:00Z',
        );
      });

      it('should return false', () => {
        expect(result).toEqual(false);
      });
    });
  });
});
