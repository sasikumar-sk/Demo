describe('fileupload', () => {

    it.skip('file upload1', () => {
        cy.visit('https://practice.expandtesting.com/upload')
        cy.title().should('contain', 'Upload')
        const image = 'images.png';
        cy.get('[data-testid="file-input"]').attachFile(image)
        cy.get('[data-testid="file-submit"]').click()
        cy.get("div[class='container'] h1").should('have.text', 'File Uploaded!')

    })

    it('file upload2', () => {

        cy.visit('https://blueimp.github.io/jQuery-File-Upload/')
        const upload = 'good mg.jpg'
        const upload1 = 'images.png'

        cy.get("input[name='files[]']").should('be.enabled').attachFile(upload)
        cy.get('.size').should('have.text', '160.95 KB')
        cy.get('.name').should('have.text', 'good mg.jpg')
        cy.get("input[name='files[]']").should('be.enabled').attachFile(upload1)
        cy.get('tbody tr:nth-child(2) td:nth-child(3) p:nth-child(1)').should('have.text', '1.32 KB')
        cy.get('tbody tr:nth-child(2) td:nth-child(2) p:nth-child(1)').should('have.text', 'images.png')

    })
})