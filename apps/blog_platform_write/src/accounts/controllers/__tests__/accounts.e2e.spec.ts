import { HttpStatus, INestApplication } from "@nestjs/common"
import { AccountsModule } from "../../accounts.module";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest'
import { CreateAccountDto } from "../../dto/create_account.sto";
import { BlogPlatformWriteModule } from "../../../blog_platform_write.module";


describe('account', () => {
    let app: INestApplication

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [BlogPlatformWriteModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    })

    afterAll(async () => {
        await app.close()
    })

    it('create account, should be status 201', async () => {
        const data: CreateAccountDto = {
            email: "asd",
            login: "asd",
            password: "asd"
        }

        const res = await request(app.getHttpServer())
            .post('/accounts')
            .send(data)

        console.log(res.body)

        expect(res.status).toBe(HttpStatus.CREATED)
        expect(res.body.login).toBe(data.login)
    })
})