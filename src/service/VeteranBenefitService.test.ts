import InMemoryPatientRepository from '../repository/InMemoryPatientRepository';
import VeteranAffairsClient from './VeteranAffairsClient';
import VeteranBenefitsService from './VeteranBenefitsService';

jest.mock('./VeteranAffairsClient');
const VAClientMock = VeteranAffairsClient as jest.MockedClass<typeof VeteranAffairsClient>;

const CONFIRMED_VETERAN = {
  ssn: '796-13-0115',
  firstName: 'Tamara',
  middleName: null,
  lastName: 'Ellis',
  birthDate: '1967-06-19',
};

const UNCONFIRMED_VETERAN = {
  ssn: '796-12-1200',
  firstName: 'Greg',
  middleName: null,
  lastName: 'Anderson',
  birthDate: '1933-04-05',
};
describe('VeteranBenefitService', () => {
  beforeEach(() => {
    VAClientMock.mockClear();
  });

  describe('isEligible', () => {
    it('reports correct eligibility for veteran patients', async () => {
      const service = new VeteranBenefitsService(
        new InMemoryPatientRepository([CONFIRMED_VETERAN, UNCONFIRMED_VETERAN]),
        new VAClientMock('https://sandbox-api.va.gov', 'test-api-key'),
      );

      VAClientMock.prototype.confirmStatus.mockResolvedValueOnce('Confirmed');
      VAClientMock.prototype.confirmStatus.mockResolvedValueOnce('Not Confirmed');

      expect(await service.isEligibleForBenefits('796-13-0115')).toEqual(true);
      expect(await service.isEligibleForBenefits('796-12-1200')).toEqual(false);
    });

    it('throws an error when attempting to confirm veteran status of a non-patient', () => {
      const service = new VeteranBenefitsService(
        new InMemoryPatientRepository([]),
        new VeteranAffairsClient('https://sandbox-api.va.gov', 'test-api-key'),
      );

      expect(service.isEligibleForBenefits('000-00-0000')).rejects.toEqual(new Error('Can not determine eligibility for a non-patient'));
    });
  });
});
