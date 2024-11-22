import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({schema: 'SalesLT', name: 'CustomerApi'})
export class CustomerApi {
 
    @PrimaryGeneratedColumn()
    customerId: number;

    @Column({ type: 'bit' })
    nameStyle: boolean;

    @Column({ type: 'nvarchar', length: 8, nullable: true })
    title: string;

    @Column({ type: 'nvarchar', length: 50 })
    firstName: string;

    @Column({ type: 'nvarchar', length: 50, nullable: true })
    middleName: string;

    @Column({ type: 'nvarchar', length: 50 })
    lastName: string;

    @Column({ type: 'nvarchar', length: 10, nullable: true })
    suffix: string;

    @Column({ type: 'nvarchar', length: 128, nullable: true })
    companyName: string;

    @Column({ type: 'nvarchar', length: 256, nullable: true })
    salesPerson: string;

    @Column({ type: 'nvarchar', length: 50, nullable: true })
    emailAddress: string;

    @Column({ type: 'nvarchar', length: 25, nullable: true })
    phone: string;

    @Column({ type: 'varchar', length: 128 })
    passwordHash: string;

    @Column({ type: 'varchar', length: 10 })
    passwordSalt: string;

    @Column({ type: 'uniqueidentifier' })
    rowguid: string;

    @Column({ type: 'datetime' })
    modifiedDate: Date;

    
    // @BeforeInsert()
    // checkUsernameInsert() {
    //     if (!this.username) {
    //         this.username = this.name
    //     }

    //     this.username = this.username
    //         .toLowerCase()
    //         .replaceAll(' ','_')
    //         .replaceAll("'",'')
    // }

    // @BeforeUpdate()
    // checkUsernameUpdate() {
    //     this.username = this.username
    //         .toLowerCase()
    //         .replaceAll(' ','_')
    //         .replaceAll("'",'')
    // }

}
