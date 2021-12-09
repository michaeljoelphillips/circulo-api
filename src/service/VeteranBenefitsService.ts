import Repository from 'src/repository/Repository';
import { Patient } from 'src/types';
import VeteranAffairsClient from './VeteranAffairsClient';

class VeteranBenefitsService {
  readonly client: VeteranAffairsClient;

  readonly patients: Repository<Patient>;

  constructor(patients: Repository<Patient>, client: VeteranAffairsClient) {
    this.client = client;
    this.patients = patients;
  }

  async isEligibleForBenefits(ssn: string): Promise<boolean> {
    const patient = await this.patients.find(ssn);

    if (!patient) {
      throw new Error('Can not determine eligibility for a non-patient');
    }

    const veteranStatus = await this.client.confirmStatus({
      ssn: patient.ssn,
      first_name: patient.firstName,
      middle_name: patient.middleName,
      last_name: patient.lastName,
      birth_date: patient.birthDate,
    });

    return veteranStatus === 'Confirmed';
  }
}

export default VeteranBenefitsService;
