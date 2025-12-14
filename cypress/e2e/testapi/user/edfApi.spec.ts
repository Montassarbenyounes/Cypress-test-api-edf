describe('test api', () => {

   it('test formulaire', () => {
cy.request({
method:'POST',
url:'https://www.edf.fr/entreprises/contacter-votre-conseiller-edf-entreprises?type_demande=branchement_provisoire_bleu&ajax_form=1&_wrapper_format=drupal_ajax',
headers: {
    'Content-Type': 'application/json' },
    body: {
        "type_demande":"branchement_provisoire_bleu",

"mail_client":"montassarbenyounes773@gmail.com",
"raison_sociale":"mby",
"cp":"78955",
"fonction_client":"pdg",
"domaine_client":"9",
"tel_pro_client":"0634645348",
"form_build_id":"form-ox-ac47FiillKoivTTehch-GqoRmIYfqKItbUQqe83E",
"form_id":"rzr_contact_form_step1_form",
"_triggering_element_name":"submit_client",
"_triggering_element_value":"Continuer",
"_drupal_ajax":"1",
"ajax_page_state[theme]":"nova",
"ajax_page_state[theme_token]":"",
"ajax_page_state[libraries]":"eJxtUdGOwyAM-6GxfVIVIGuzQuBCuFP__tKVqX3YA8LYsqOYUAQfUXqFdIeuJZRcEyrewi4QKwqb9PrpKNv9WSTfuPzCA4JS4eZ8V93vjNwPxQtCDNKzbwdhkRk4okxmmp6lWOY3ZTHfqbAa55BVsAo1dOdsjKRFCJKrMOPgWoWALiQyy0FdJ-1m1xSrWXhY5lQ8pANfZx_YLTQvyc5II659wAQehy_hjBwHJl7dUvKIz0B8qUUgUjlgQ1svgmwX2bi90M8j2XPglarbo0ebTUHxAyms2_QaioJv7lv2H_r3_paa93YqCMwCdWmfnz-Ze7c9faK2YLy1zSrLDw8N_wG5yNRP"
    }
 }).then((response ) => {
    
expect(response.status).to.eq(200) ;
 } )
  })
   })