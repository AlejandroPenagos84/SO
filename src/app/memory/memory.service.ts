import { Injectable } from '@angular/core';
import { signal } from '@angular/core'; // Importa signal desde Angular
import { FacadeMemory } from '@app/MemoryManagmentLogic/FacadeMemory';
import { Process } from '@app/MemoryManagmentLogic/interfaces/Process.interface';
import { Program } from '@app/MemoryManagmentLogic/interfaces/Program.interface';
import { UnitMemory } from '@app/MemoryManagmentLogic/interfaces/UnitMemory.interface';
import info from './programas.json';

@Injectable({
  providedIn: 'root',
})
export class MemoryService {
  private facadeMemory = new FacadeMemory();

  // Declara signals para memoryContigous y memoryDiscontigous
  memoryContigous = signal<Process[]>([]);
  memoryDiscontigous = signal<UnitMemory[]>([]);
  programs = signal<Program[]>(info);
  isContigous: boolean = true;

  constructor() {}

  chooseStrategy(currentTypePartition: string, sizePartition: number): void {
    this.memoryContigous.set([]);
    this.memoryDiscontigous.set([]);
    this.facadeMemory.configure(currentTypePartition, sizePartition);
  }

  addProcessContiguous(newProgram: Program): boolean {
    const added: boolean =
      this.facadeMemory.addProcessContigousMemory(newProgram);

    // Actualiza el signal con la nueva memoria contigua
    this.memoryContigous.set([...this.facadeMemory.getContigousMemory()]);

    return added;
  }

  addProcessDiscontiguous(newProgram: Program): boolean {
    const added: boolean =
      this.facadeMemory.addProcessDiscontigousMemory(newProgram);

    // Actualiza el signal con la nueva memoria discontinua
    this.memoryDiscontigous.set([...this.facadeMemory.getDiscontigousMemory()]);

    return added;
  }

  removeProcessContiguous(idProcess: string): boolean {
    const removed: boolean =
      this.facadeMemory.removeProcessContigousMemory(idProcess);

    // Actualiza el signal después de remover el proceso
    this.memoryContigous.set([...this.facadeMemory.getContigousMemory()]);

    return removed;
  }

  removeProcessDiscontiguous(idUnitProgram: string): boolean {
    const removed: boolean =
      this.facadeMemory.removeProcessDiscontigousMemory(idUnitProgram);

    // Actualiza el signal después de remover el proceso
    this.memoryDiscontigous.set([...this.facadeMemory.getDiscontigousMemory()]);

    return removed;
  }

  fixedPartititions(): number[] {
    return this.facadeMemory.getFixedPartitions();
  }

  getNumberPagingArray(): number[] {
    return this.facadeMemory.getNumberPagingArray();
  }

  addProgramToChoose(newProgramToChoose: Program): void{
    const currentPrograms = this.programs(); 
    this.programs.set([...currentPrograms,newProgramToChoose])
  }

  setInitialContigousMemory(): void{
    this.memoryContigous.set(this.facadeMemory.getContigousMemory())
  }

  setInitialDiscontigousMemory(): void{
    this.memoryDiscontigous.set(this.facadeMemory.getDiscontigousMemory())
  }
}
