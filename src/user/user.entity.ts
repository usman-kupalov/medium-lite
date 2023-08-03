import { Column, DataType, IsEmail, Unique, Table, Model, HasMany } from 'sequelize-typescript';
import { Post } from 'src/post/post.entity';

@Table({
  tableName: 'user',
  timestamps: true
})
export class User extends Model<User>{
  
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true 
  })
  id: number;
  
  @IsEmail
  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true
  })
  rating: number;

  @HasMany(() => Post)
  posts: Post[]
}
