import { Patient } from 'src/types';
import Repository from './Repository';

class InMemoryPatientRepository implements Repository<Patient> {
  readonly patients: Patient[];

  constructor(patients: Patient[]) {
    this.patients = patients;
  }

  async all() {
    return this.patients;
  }

  async find(ssn: string) {
    return this.patients.find((p) => p.ssn === ssn);
  }

  async add(patient: Patient) {
    this.patients.push(patient);

    return Promise.resolve();
  }
}

export default InMemoryPatientRepository;
