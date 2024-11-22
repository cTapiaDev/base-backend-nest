import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Item {

    // TABLA DE EJEMPLO

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    rut: string;

    @Column('text')
    name: string;

    @Column('text')
    username: string

    @Column('int', {
        default: 0
    })
    age: number;

    @Column('text', {
        array: true,
        default: []
    })
    skills: string[];

    
    @BeforeInsert()
    checkUsernameInsert() {
        if (!this.username) {
            this.username = this.name
        }

        this.username = this.username
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')
    }

    @BeforeUpdate()
    checkUsernameUpdate() {
        this.username = this.username
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')
    }

}
