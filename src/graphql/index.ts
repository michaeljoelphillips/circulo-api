import { Patient } from 'src/types';
import VeteranAffairsClient from '../service/VeteranAffairsClient';
import VeteranBenefitsService from '../service/VeteranBenefitsService';
import InMemoryPatientRepository from '../repository/InMemoryPatientRepository';

const patients = new InMemoryPatientRepository([
  {
    ssn: '796130115',
    firstName: 'Tamara',
    middleName: null,
    lastName: 'Ellis',
    birthDate: '1967-06-19',
  },
  {
    ssn: '796121200',
    firstName: 'Greg',
    middleName: null,
    lastName: 'Anderson',
    birthDate: '1933-04-05',
  },
]);

const benefitsService = new VeteranBenefitsService(
  patients,
  new VeteranAffairsClient(
    process.env.APP_VA_API_URL,
    process.env.APP_VA_API_KEY,
  ),
);

const resolverMap = {
  Query: {
    patient: async (_: any, args: { id: string }) => patients.find(args.id.replace(/\D/g, '')),
    patients: async () => patients.all(),
  },
  Mutation: {
    addPatient: async (_: any, args: { input: Patient }) => {
      const patient = {
        ...args.input,
        ssn: args.input.ssn.replace(/\D/g, ''),
      };

      await patients.add(patient);

      return patient;
    },
  },
  Patient: {
    benefitsEligibility: async (obj: Patient) => {
      try {
        const isEligible = await benefitsService.isEligibleForBenefits(obj.ssn);

        return isEligible ? 'ELIGIBLE' : 'INELIGIBLE';
      } catch (e) {
        return 'INELIGIBLE';
      }
    },
  },
};

export default resolverMap;
